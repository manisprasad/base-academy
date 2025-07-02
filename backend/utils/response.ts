import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export type ApiResponseType<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

export class ApiResponse {
  // Success
  static success<T>(
    res: Response<ApiResponseType<T>>,
    message: string,
    data?: T,
    status: number = StatusCodes.OK
  ): Response<ApiResponseType<T>> {
    return res.status(status).json({ success: true, message, data });
  }

  // Generic error
  static error<T = undefined>(
    res: Response<ApiResponseType<T>>,
    message: string,
    status: number = StatusCodes.INTERNAL_SERVER_ERROR
  ): Response<ApiResponseType<T>> {
    return res.status(status).json({ success: false, message });
  }

  // Not Found
  static notFound<T = undefined>(
    res: Response<ApiResponseType<T>>,
    message: string = "Resource not found"
  ): Response<ApiResponseType<T>> {
    return this.error(res, message, StatusCodes.NOT_FOUND);
  }

  // Unauthorized
  static unauthorized<T = undefined>(
    res: Response<ApiResponseType<T>>,
    message: string = "Unauthorized access"
  ): Response<ApiResponseType<T>> {
    return this.error(res, message, StatusCodes.UNAUTHORIZED);
  }

  // Forbidden
  static forbidden<T = undefined>(
    res: Response<ApiResponseType<T>>,
    message: string = "Forbidden access"
  ): Response<ApiResponseType<T>> {
    return this.error(res, message, StatusCodes.FORBIDDEN);
  }

  // Bad Request
  static badRequest<T = undefined>(
    res: Response<ApiResponseType<T>>,
    message: string = "Bad request"
  ): Response<ApiResponseType<T>> {
    return this.error(res, message, StatusCodes.BAD_REQUEST);
  }

  // Conflict
  static conflict<T = undefined>(
    res: Response<ApiResponseType<T>>,
    message: string = "Conflict"
  ): Response<ApiResponseType<T>> {
    return this.error(res, message, StatusCodes.CONFLICT);
  }

  // Internal Server Error
  static internal<T = undefined>(
    res: Response<ApiResponseType<T>>,
    message: string = "Internal server error"
  ): Response<ApiResponseType<T>> {
    return this.error(res, message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
