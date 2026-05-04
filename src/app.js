const express = require('express');
const cors = require('./infrastructure/http/middleware/cors');
const errorHandler = require('./infrastructure/http/middleware/errorHandler');
const setupSwagger = require('./infrastructure/http/swagger/swaggerSetup');

// Routes
const playerRoutes = require('./infrastructure/http/routes/playerRoutes');
const ceremonyRoutes = require('./infrastructure/http/routes/ceremonyRoutes');
const { nominationRouter, nestedNominationRouter } = require('./infrastructure/http/routes/nominationRoutes');
const ratingRoutes = require('./infrastructure/http/routes/ratingRoutes');

const app = express();

app.use(cors);
app.use(express.json());

// Swagger
setupSwagger(app);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/players', playerRoutes);
app.use('/api/ceremonies', ceremonyRoutes);
app.use('/api/ceremonies/:year/nominations', nestedNominationRouter);
app.use('/api/nominations', nominationRouter);
app.use('/api/nominations/:id', ratingRoutes);

// Error Handler
app.use(errorHandler);

module.exports = app;
