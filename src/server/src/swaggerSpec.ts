import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pure && Lazy API',
      version: '1.0.0',
    },
  },
  apis: ['./src/server/src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
