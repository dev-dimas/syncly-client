type ApiSuccessData<T> = {
  status: number;
  message: string;
  data: T;
};
type BaseApiResponse = {
  status: number;
  message: string;
};
export type ApiSuccess<T = void> = T extends void
  ? BaseApiResponse
  : ApiSuccessData<T>;

export type ApiError = BaseApiResponse;
