interface BmiValues {
    height: number;
    weight: number;
}

const parseBMIArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
          height: Number(args[2]),
          weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

//BMI uses height in cm and weight in kg
const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters = height/100;
    const bmi = weight/(heightInMeters*heightInMeters);

    switch (true) {
        case bmi < 16:
            return "Underweigh (Severe thinness)";

        case bmi >= 16 && bmi < 17:
            return "Underweight (Moderate thinness)";

        case bmi >= 17 && bmi < 18.5:
            return "Underweight (Mild thinness)";

        case bmi >= 18.5 && bmi < 25:
            return "Normal (Healthy weight)";

        case bmi >= 25 && bmi < 30:
            return "Overweight (Pre-obese)";

        case bmi >= 30 && bmi < 35:
            return "Obese (Class I)";

        case bmi >= 35:
            return "Obese (Class II)";
    
        default:
            return "Obese (Class II)";
    }
}

try {
    const { height, weight } = parseBMIArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}