const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const { playerController } = require('../../dependencies');
const validate = require('../middleware/validate');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

const playerValidation = [
  body('name').notEmpty().withMessage('Name is required').isString().isLength({ min: 2, max: 100 }),
  body('nationality').notEmpty().withMessage('Nationality is required').isString().isLength({ max: 100 }),
  body('club').notEmpty().withMessage('Club is required').isString().isLength({ max: 100 }),
  body('position').notEmpty().withMessage('Position is required').isIn(['GK', 'DEF', 'MID', 'FWD'])
];

router.get('/', (req, res, next) => playerController.getAll(req, res, next));
router.get('/:id', (req, res, next) => playerController.getById(req, res, next));
router.post('/', upload.single('photo'), playerValidation, validate, (req, res, next) => playerController.create(req, res, next));
router.put('/:id', upload.single('photo'), playerValidation, validate, (req, res, next) => playerController.update(req, res, next));
router.delete('/:id', (req, res, next) => playerController.delete(req, res, next));

module.exports = router;
