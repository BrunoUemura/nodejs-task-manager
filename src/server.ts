import 'dotenv/config';
import express from 'express';
import task from './routes/tasks';
import { connectDB } from './database/connect';
import { notFound } from './middleware/not-found';
import { errorHandlerMiddleware } from './middleware/error-handler';

const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(express.static('./public'));
app.use(express.json());

// routes
app.use('/api/v1/tasks', task);

app.use(notFound);
app.use(errorHandlerMiddleware);

(async () => {
  try {
    await connectDB(String(process.env.MONGO_URI));
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
})();
