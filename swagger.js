const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Swing Notes API",
            version: "5.12.2",
            description: "API documentation",
        }, 
        servers: [
            {
                url: "http://127.0.0.1:5000",
                description: "Local server"
            }
        ],
        components: {
            schemas: {
                Note: {
                    type: "object",
                    // required:[ "title", "text"],
                    properties: {
                        title: {
                            type: "string",
                            description: "Max 50 characters"
                        },
                        text: {
                            type: "string",
                            description: "Max 300 characters"
                        }
                    }

                },
                User: {
                    type: "object",
                    required: ["username", "password"],
                    properties: {
                        username: {
                            type: "string"
                        },
                        password: {
                            type: "string"
                        }
                    }
                }
            },
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                }
            },
            responses:{
                UnauthorizedError: {
                    description: "Access token is missing or invalid "   
                }
            }
        }, 
    },

    apis: ["./routes/*.js"],
}

const specs = swaggerJsdoc(options)

module.exports = specs