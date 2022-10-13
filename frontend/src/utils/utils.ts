import _ from "underscore";
import { ResponseError } from "./shared/types";

export const mapErrorResponse = (error: any) => {
  const responseError = {
    status: error.response.data.status,
    message: error.response.data.message,
  }

  return responseError as ResponseError;
}