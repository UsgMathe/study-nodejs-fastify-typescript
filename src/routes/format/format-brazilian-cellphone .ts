import z from 'zod';
import { FastifyInstanceWithValidator } from '../../types';
import { cellphoneRegex } from '../../../utils/regex';

export async function formatBrazilianCellphone(
  server: FastifyInstanceWithValidator
) {
  server.post(
    '/format/brazilian-cellphone',
    {
      schema: {
        body: z.object({
          cellphone: z
            .string()
            .transform(value => value.replace(/\D/g, ''))
            .refine(
              value => value.length == 11,
              'Expected cellphone with 11 numbers.'
            ),
        }),
      },
    },
    (request, reply) => {
      const { cellphone } = request.body;

      const formattedCellphone = cellphone.replace(
        cellphoneRegex,
        '+55 ($1) $2-$3'
      );

      reply.send({ formattedCellphone });
    }
  );
}
