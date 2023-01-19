import express from 'express';
import cors from 'cors';
import router from './route/routes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/todos',router)

app.listen(3000, () => {
  console.log('App listening on port 3000');
});

export default app;
