import * as express from 'express';
import * as path from 'path';
import swaggerUi from 'swagger-ui-express';
import connectToDatabase from './config/db';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import authRoutes from './routes/authRoutes';
import portfolioRoutes from './routes/portfolioRoutes';
import swaggerSpec from './swaggerSpec';

import funfactRoutes from './routes/funfactRoutes';

import * as dotenv from 'dotenv';
dotenv.config();

connectToDatabase();

const app = express();

app.use(express.static(path.join(process.cwd(), '/dist/apps/client')));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/funfact', funfactRoutes);

app.get('*', (_req, res) => {
  res.sendFile('index.html', {
    root: path.join(process.cwd(), '/dist/apps/client'),
  });
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log('Express listening at http://localhost:' + port + '/');
});
server.on('error', console.error);
