import express from 'express';
import { calculateBmi } from './bmiFunction';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const heightStr = req.query.height;
    const weightStr = req.query.weight;

    if(!isNaN(Number(heightStr)) && !isNaN(Number(weightStr)))
        res.send({
            weight: Number(weightStr),
            height: Number(heightStr),
            bmi: calculateBmi(Number(heightStr), Number(weightStr))
        });
    else {
        throw new Error('malformatted parameters');
    }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});