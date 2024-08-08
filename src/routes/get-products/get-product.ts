import z from "zod";
import { FastifyInstanceWithValidator } from "../../types";
import { products } from "../../data/products.data";
import { formatError } from "../../../utils/ErrorFormatter";

export async function getProducts(server: FastifyInstanceWithValidator) {
  server.get(
    "/products/:id",
    { schema: { params: z.object({ id: z.coerce.number() }) } },
    (request, reply) => {
      const { id } = request.params;

      const product = products.find((product) => product.id == id);
      console.log(product);
      if (product) reply.send(product);
      else
        reply
          .code(404)
          .send(
            formatError(
              404,
              "Product Not Found",
              `No product found with ID ${id}`
            )
          );
    }
  );
}
