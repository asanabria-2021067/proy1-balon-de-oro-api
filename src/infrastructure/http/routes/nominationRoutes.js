const express = require('express');
const { body } = require('express-validator');
const { nominationController } = require('../../dependencies');
const validate = require('../middleware/validate');

const router = express.Router();

const nominationValidation = [
  body('playerId').optional().isInt(),
  body('jugadorId').optional().isInt(),
  body('rank').optional().isInt({ min: 1, max: 100 }),
  body('puesto').optional().isInt({ min: 1, max: 100 }),
  body('year').optional().isInt({ min: 1900, max: 2100 }),
  body('año').optional().isInt({ min: 1900, max: 2100 }),
  body('votesReceived').optional().isInt({ min: 0 })
];

// Flat routes
router.post('/', nominationValidation, validate, (req, res, next) => nominationController.create(req, res, next));
router.delete('/:id', (req, res, next) => nominationController.delete(req, res, next));

// Ceremony-nested routes (will be mounted in app.js with appropriate prefix)
const nestedRouter = express.Router({ mergeParams: true });
nestedRouter.get('/', (req, res, next) => nominationController.getByCeremony(req, res, next));
nestedRouter.post('/', nominationValidation, validate, (req, res, next) => nominationController.create(req, res, next));

module.exports = {
  nominationRouter: router,
  nestedNominationRouter: nestedRouter
};
