const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const setupSwagger = (app) => {
  const openapiPath = path.join(__dirname, 'openapi.yaml');
  const openapiContent = fs.readFileSync(openapiPath, 'utf8');
  const swaggerDocument = yaml.load(openapiContent);

  const options = {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customSiteTitle: "Balón de Oro API Docs",
  };

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
};

module.exports = setupSwagger;
