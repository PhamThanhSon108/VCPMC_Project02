export interface IParamsHTTP {
  method?: "get" | "post" | "delete" | "put";
  path: string;
  payload?: any;
  params?: any;
  config?: {
    responseType?: "arraybuffer";
    isFormData?: boolean;
    signal?: AbortSignal;
  };
  showSuccess?: boolean;
  showError?: boolean;
  convert?: any;
}

export const HTTPRepository = {
  execute: ({
    method = "get",
    path = "",
    payload,
    config = { responseType: undefined },
    params,
    showSuccess = true,
    showError = true,
  }: IParamsHTTP) => {
    switch (method) {
      case "get": {
        break;
      }
      case "delete": {
        break;
      }
      case "post":
      case "put": {
        break;
      }

      default:
        break;
    }
  },
};
