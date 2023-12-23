// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ServerFunction = (...args: any[]) => Promise<unknown>;
type ServerFunctionErrorHandler = (error: Error) => Promise<void>;
type ServerFunctionSuccessHandler = (data: unknown) => Promise<void>;

type UseServerFunctionParams<
  TFunction extends ServerFunction,
  TErrorHandler extends ServerFunctionErrorHandler = never,
  TSuccessHandler extends ServerFunctionSuccessHandler = never,
> = {
  fn: TFunction;
  onError?: TErrorHandler;
  onSuccess?: TSuccessHandler;
  onSettled?: () => Promise<void>;
  delay?: number;
};

type UseServerFunctionSuccess<TFunction extends ServerFunction> = {
  status: "success";
  isSuccess: true;
  data: Awaited<ReturnType<TFunction>>;
  isError: false;
  error: undefined;
};

type UseServerFunctionError = {
  status: "error";
  isSuccess: false;
  isError: true;
  data: undefined;
  error: Error;
};

type UseServerFunctionReturnValue<TFunction extends ServerFunction> = Promise<
  UseServerFunctionSuccess<TFunction> | UseServerFunctionError
>;

export const serverFunction = <
  TFunction extends ServerFunction,
  TErrorHandler extends ServerFunctionErrorHandler = never,
  TSuccessHandler extends ServerFunctionSuccessHandler = never,
>(
  params: UseServerFunctionParams<TFunction, TErrorHandler, TSuccessHandler>,
) => {
  return async (
    ...args: Parameters<TFunction>
  ): UseServerFunctionReturnValue<TFunction> => {
    try {
      if (params.delay) {
        await new Promise((resolve) => setTimeout(resolve, params.delay));
      }
      const data = (await params.fn(...args)) as Awaited<ReturnType<TFunction>>;
      const successReturnValue: UseServerFunctionSuccess<TFunction> = {
        status: "success",
        isSuccess: true,
        isError: false,
        data,
        error: undefined,
      };
      if (params.onSuccess) {
        await params.onSuccess(data);
      }
      return successReturnValue;
    } catch (error) {
      const errorReturnValue: UseServerFunctionError = {
        status: "error",
        isSuccess: false,
        isError: true,
        error: error instanceof Error ? error : new Error(),
        data: undefined,
      };
      if (params.onError) {
        await params.onError(errorReturnValue.error);
      }
      return errorReturnValue;
    } finally {
      if (params.onSettled) {
        await params.onSettled();
      }
    }
  };
};
