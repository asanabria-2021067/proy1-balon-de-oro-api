const express = require('express');
const { body } = require('express-validator');
const { nominationController } = require('../../dependencies');
const validate = require('../middleware/validate');

const router = express.Router();

const nominationValidation = [
  body('playerId').notEmpty().withMessage('playerId is required').isInt(),
  body('rank').notEmpty().withMessage('Rank is required').isInt({ min: 1, max: 10 }),
  body('votesReceived').optional().isInt({ min: 0 })
];

// Flat routes
router.delete('/:id', (req, res, next) => nominationController.delete(req, res, next));

// Ceremony-nested routes (will be mounted in app.js with appropriate prefix)
const nestedRouter = express.Router({ mergeParams: true });
nestedRouter.get('/', (req, res, next) => nominationController.getByCeremony(req, res, next));
nestedRouter.post('/', nominationValidation, validate, (req, res, next) => nominationController.create(req, res, next));

module.exports = {
  nominationRouter: router,
  nestedNominationRouter: nestedRouter
};
