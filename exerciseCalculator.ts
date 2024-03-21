interface exerciseValues {
    target: number;
    dailyHours: number[];
}

const parseArguments = (args: string[]): exerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    
    let notNumberFound = false;
    let targetHours: number = 0;
    
    if (!isNaN(Number(args[2])))
        targetHours = Number(args[2]);
    else
        notNumberFound = true;

    let i = 3; //While iterator
    let numbers: number[] = [];
    while(!notNumberFound && i < args.length) {
        if(!isNaN(Number(args[i])))
            numbers = numbers.concat(Number(args[i]));
        else
            notNumberFound = true;
        i++;
    }
    if(!notNumberFound)
        return { target: targetHours, dailyHours: numbers }
    else {
        throw new Error('Provided values were not numbers!');
    }
}

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    retingDescription: string;
    target: number;
    average: number;
}

//Calculates the average daily exercise hours
//and compares it to the target hours.
//Returns an object with various values
const calculateExercises = (dailyHours: number[], targetAverage: number): Result => {
    const workingDailyHours: number[] = dailyHours.filter(dayHours => dayHours > 0 )

    let totalHours: number = 0;
    workingDailyHours.map(day => totalHours += day)

    const averageHours: number = totalHours/dailyHours.length;

    const deviation: number = targetAverage - averageHours;
    let rating, description;

    switch (true) {
        case deviation <= 0:
            rating = 3;
            description = 'objective met! Keep it up!'
            break;

        case deviation > 0 && deviation <= 1:
            rating = 2;
            description = 'not too bad but could be better, push it a little more!'
            break;
    
        default:
            rating = 1;
            description = 'you need to work harder, but you can do it!'
            break;
    }

    const res: Result = {
        periodLength: dailyHours.length,
        trainingDays: workingDailyHours.length,
        target: targetAverage,
        average: averageHours,
        success: averageHours > targetAverage,
        rating: rating,
        retingDescription: description,
    }

    return res;
}

try {
    const { target, dailyHours } = parseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}