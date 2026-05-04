const express = require('express');
const cors = require('./infrastructure/http/middleware/cors');
const errorHandler = require('./infrastructure/http/middleware/errorHandler');
const setupSwagger = require('./infrastructure/http/swagger/swaggerSetup');

const playerRoutes = require('./infrastructure/http/routes/playerRoutes');
const ceremonyRoutes = require('./infrastructure/http/routes/ceremonyRoutes');
const { nominationRouter, nestedNominationRouter } = require('./infrastructure/http/routes/nominationRoutes');
const ratingRoutes = require('./infrastructure/http/routes/ratingRoutes');

const app = express();

app.use(cors);
app.use(express.json());

setupSwagger(app);

app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido al backend de Balón de Oro',
    version: '1.0.0',
    docs: '/api/docs',
    status: 'ok'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use('/api/players', playerRoutes);
app.use('/api/ceremonies', ceremonyRoutes);
app.use('/api/ceremonies/:year/nominations', nestedNominationRouter);
app.use('/api/nominations', nominationRouter);
app.use('/api/nominations/:id', ratingRoutes);

app.use(errorHandler);

module.exports = app;
