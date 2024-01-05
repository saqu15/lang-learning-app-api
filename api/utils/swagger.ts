import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: '3.1.0',
		info: {
			title: 'REST API Docs',
			version: process.env.npm_package_version || '',
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ['./api/routes/*.ts', './api/models/*.ts', './api/enums/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
	// Swagger page
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
	app.get('/docs.json', (req: Request, res: Response) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	});

	console.log(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
