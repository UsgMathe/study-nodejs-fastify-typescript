import { cellphoneRegex } from '../../../utils/regex';
import { CellPhoneSchema } from '../../schemas/cellphone-schema';
import { FastifyInstanceWithValidator } from '../../types';

export async function formatBrazilianCellphone(
  server: FastifyInstanceWithValidator
) {
  server.post(
    '/format/brazilian-cellphone',
    {
      schema: {
        body: CellPhoneSchema,
      },
    },
    (request, reply) => {
      const { cellphone } = request.body;

      const formattedCellphone = cellphone
        .toString()
        .replace(cellphoneRegex, '+55 ($1) $2-$3');

      reply.send({ formattedCellphone });
    }
  );
}
