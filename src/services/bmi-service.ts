const bmiCategories = [
  { max: 17, result: 'Severely underweight' },
  { max: 18.5, result: 'Underweight' },
  { max: 25, result: 'Normal weight' },
  { max: 30, result: 'Overweight' },
  { max: 35, result: 'Obesity grade I' },
  { max: 40, result: 'Obesity grade II' },
  { max: Infinity, result: 'Obesity grade III' },
];

export function calculateBmi(
  weight: number,
  height: number
): { bmi: number; result: string } {
  const heightInMeters = height / 100;
  const bmi = Number((weight / heightInMeters ** 2).toFixed(2));
  const result = classifyBmi(bmi);
  return { bmi, result };
}

function classifyBmi(bmi: number): string {
  const category = bmiCategories.find(category => bmi < category.max);
  if (category) {
    return category.result;
  } else {
    throw new Error('Category not found');
  }
}
