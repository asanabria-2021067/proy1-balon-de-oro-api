const express = require('express');
const { body } = require('express-validator');
const { ceremonyController } = require('../../dependencies');
const validate = require('../middleware/validate');

const router = express.Router();

const ceremonyValidation = [
  body('year').notEmpty().withMessage('Year is required').isInt({ min: 1956, max: 2030 }),
  body('winnerId').notEmpty().withMessage('winnerId is required').isInt()
];

const ceremonyUpdateValidation = [
  body('winnerId').notEmpty().withMessage('winnerId is required').isInt()
];

router.get('/', (req, res, next) => ceremonyController.getAll(req, res, next));
router.get('/:year', (req, res, next) => ceremonyController.getByYear(req, res, next));
router.post('/', ceremonyValidation, validate, (req, res, next) => ceremonyController.create(req, res, next));
router.put('/:year', ceremonyUpdateValidation, validate, (req, res, next) => ceremonyController.update(req, res, next));
router.delete('/:year', (req, res, next) => ceremonyController.delete(req, res, next));

module.exports = router;
