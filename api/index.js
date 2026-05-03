const app = require('../src/app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/api/docs`);
  });
}

module.exports = app;
