// npm i swagger-autogen
// npm i swagger-ui-express

// Para atualizar o Swagger
// node swagger.js

const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./route.js'];

swaggerAutogen(outputFile, endpointsFiles);

