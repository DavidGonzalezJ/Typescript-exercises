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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2))