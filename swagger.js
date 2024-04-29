const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    swaggerDefinition: {
        openapi: "3.1.0",
        info: {
            title: "Swing Notes application",
            version: "5.12.2",
            description: "API documentation",
        }, 
        servers: [
            {
                url: "http://127.0.0.1:5000",
                description: "Development server"
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

                }
            }
        }
    },
    apis: ["./routes/*.js"],
}

const specs = swaggerJsdoc(options)

module.exports = specs