const express = require('express');
const { body } = require('express-validator');
const { ratingController } = require('../../dependencies');
const validate = require('../middleware/validate');

const router = express.Router({ mergeParams: true });

const ratingValidation = [
  body('score').notEmpty().withMessage('Score is required').isInt({ min: 1, max: 5 }),
  body('comment').optional().isString().isLength({ max: 500 })
];

router.post('/rating', ratingValidation, validate, (req, res, next) => ratingController.create(req, res, next));
router.get('/rating', (req, res, next) => ratingController.getRating(req, res, next));

module.exports = router;
