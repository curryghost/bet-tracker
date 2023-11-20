import { ErrorType } from "./models";

export class ApiError extends Error {
  type: ErrorType;
  constructor(type: ErrorType, message: string) {
    super(message);
    this.type = type;
  }
}

export const errorHandler = (error: ApiError | any) => {
  logger(error);
  if (error instanceof ApiError) {
    switch (error.type) {
      case ErrorType.UNAUTHORIZED:
        return new Response(error.message, { status: 401 });
      case ErrorType.INTERNAL_SERVER_ERROR:
        return new Response(error.message, { status: 500 });
      case ErrorType.NOT_FOUND:
        return new Response(error.message, { status: 404 });
      case ErrorType.BAD_REQUEST:
        return new Response(error.message, { status: 400 });
      default:
        return new Response("Internal Server Error", { status: 500 });
    }
  }
  return new Response("Internal Server Error", { status: 500 });
};

export const logger = (error: ApiError | any) => {
  if (!import.meta.env.PROD) {
    console.error(error);
  }
};
