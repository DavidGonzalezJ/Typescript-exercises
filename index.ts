import express from 'express';
import { calculateBmi } from './bmiFunction';
import { calculateExercises } from './exerciseFunction';
const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    
    if( !target || isNaN(Number(target)) ){
        return res.status(400).send({ error: 'malformatted target number'});
    }
    if( !daily_exercises )
        return res.status(400).send({ error: 'parameters missing'});

    let finished = true;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    daily_exercises.forEach((day: number) => {
        if(typeof(day)!== 'number'){
            finished = false;
        }
    });
    
    if(!finished)
        return res.status(400).send({ error: 'malformatted day number'});
    
    return res.send(calculateExercises(daily_exercises as number[], target as number));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});