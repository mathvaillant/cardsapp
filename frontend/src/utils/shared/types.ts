export interface APIResponse {
  status: string
  message: string
}

export interface ResponseError extends APIResponse {
  data: undefined
}