import express from 'express';
import routes from './routes';
import cors from 'cors';
const app = express();

const PORT = 5000;

app.use(cors());
app.listen(PORT, () => {
  console.log('Listening on port : ', PORT);
});

app.use('/api', routes);

export default app;
