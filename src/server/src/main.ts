import * as express from 'express';
import * as path from 'path';
import swaggerUi from 'swagger-ui-express';
import connectToDatabase from './models/index';
import authRouter from './routes/authRouter';
import portfolioRouter from './routes/portfolioRouter';
import swaggerSpec from './swaggerSpec';

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

app.use('/api/auth', authRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('*', (_req, res) => {
  res.sendFile('index.html', {
    root: path.join(process.cwd(), '/dist/apps/client'),
  });
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log('Express listening at http://localhost:' + port + '/');
});
server.on('error', console.error);
