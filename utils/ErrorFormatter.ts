export type FormattedError = {
  error: string;
  message: string;
  statusCode: number;
};

export function formatError(
  statusCode: number,
  error: string,
  message: string
): FormattedError {
  return { error, message, statusCode };
}
