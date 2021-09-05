const swaggerAutogen = require('swagger-autogen')

swaggerAutogen()("./swagger.json", ["./rotas.js"])