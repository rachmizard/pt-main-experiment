import AxiosAdapterService, { axiosInstance } from "./axiosAdapter.service";

export default class FileService extends AxiosAdapterService {
  constructor() {
    super();

    this.cancelTokenSource = axiosInstance.CancelToken.source();
  }

  async uploadFile(file, config = {}) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      return await this.sendPostRequest(
        "/admin/courses/upload-file",
        formData,
        config
      );
    } catch (error) {
      if (axiosInstance.isCancel(error)) {
        throw new Error(error);
      } else {
        if (error?.response) {
          throw new Error("Gagal mengupload: " + error.response.data.message);
        }

        throw new Error(error.message);
      }
    }
  }

  restartCancelToken() {
    this.cancelTokenSource = axiosInstance.CancelToken.source();
  }
}
