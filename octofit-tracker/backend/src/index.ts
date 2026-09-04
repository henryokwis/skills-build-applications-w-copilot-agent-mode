import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-api', baseUrl });
});

app.get('/api', (_request, response) => {
  response.json({
    name: 'OctoFit Tracker API',
    baseUrl,
    resources: ['users', 'teams', 'activities', 'leaderboard', 'workouts'],
  });
});

function registerResourceRoutes(path: string, model: typeof User): void {
  app.get(`/api/${path}`, async (_request, response) => {
    try {
      response.json(await model.find().sort({ createdAt: -1 }));
    } catch {
      response.status(503).json({ error: 'Database unavailable' });
    }
  });

  app.post(`/api/${path}`, async (request: Request, response: Response) => {
    try {
      const document = await model.create(request.body);
      response.status(201).json(document);
    } catch (error) {
      response.status(400).json({ error: error instanceof Error ? error.message : 'Invalid request' });
    }
  });
}

registerResourceRoutes('users', User);
registerResourceRoutes('teams', Team);
registerResourceRoutes('activities', Activity);
registerResourceRoutes('leaderboard', Leaderboard);
registerResourceRoutes('workouts', Workout);

app.use((_request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

await connectDatabase();

app.listen(port, () => {
  console.log(`OctoFit API listening on ${baseUrl}`);
});
