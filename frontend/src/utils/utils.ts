import { ResponseError } from "./shared/types";

export const mapErrorResponse = (error: any) => {
  const responseError = {
    status: error?.response?.data?.status || 400,
    message: error?.response?.data?.message || 'Something went wrong',
  }

  return responseError as ResponseError;
}