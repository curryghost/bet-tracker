export const enum ErrorType {
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  BAD_REQUEST,
}

export interface ApiError {
  type: ErrorType;
  message: string;
}
