import { ResponseError } from "@internal/shared";

export const mapErrorResponse = (error: any) => {
  const responseError = {
    status: error?.response?.data?.status || 400,
    message: error?.response?.data?.message || 'Something went wrong',
  }

  return responseError as ResponseError;
}

export const mapAuthBearerToken = (token: string) => {
  return { 
    headers: { 
      Authorization: `Bearer ${token}` 
    }
  }
}

export const getToken = (): string => {
  const user = JSON.parse(localStorage.getItem('user') as string);
  return user.token;
}
