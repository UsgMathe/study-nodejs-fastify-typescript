import z from 'zod';
import { FastifyInstanceWithValidator } from '../../types';

const bmiCategories = [
  { max: 17, result: 'Severely underweight' },
  { max: 18.5, result: 'Underweight' },
  { max: 25, result: 'Normal weight' },
  { max: 30, result: 'Overweight' },
  { max: 35, result: 'Obesity grade I' },
  { max: 40, result: 'Obesity grade II' },
  { max: Infinity, result: 'Obesity grade III' },
];

function classifybmi(bmi: number): string {
  const category = bmiCategories.find(category => bmi < category.max);
  if (category) {
    return category.result;
  } else {
    throw new Error('Category not found');
  }
}

export async function calculateBmi(server: FastifyInstanceWithValidator) {
  server.post(
    '/calculate/bmi',
    {
      schema: {
        body: z.object({
          weight: z.number().min(4).max(600),
          height: z.number().min(50).max(300),
        }),
      },
    },
    (request, reply) => {
      const { weight, height } = request.body;
      const heightInMeters = height / 100;

      const bmi = Number((weight / heightInMeters ** 2).toFixed(2));
      let result = classifybmi(bmi);

      reply.send({ bmi, result });
    }
  );
}
