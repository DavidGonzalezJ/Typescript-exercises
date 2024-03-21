//BMI uses height in cm and weight in kg
export const calculateBmi = (height: number, weight: number): string => {
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