import axios from "axios";

export const axiosInstance = axios;

export default class AxiosAdapterService {
     constructor() {
          this.reqClient = axios.create({
               baseURL: "https://stg.api-procurementmanagement.id/v1",
          });

          const token = JSON.parse(localStorage.getItem("__auth__"));

          this.reqClient.defaults.headers.common[
               "Authorization"
          ] = `Bearer ${token?.tokens.access.token}`;

          this.reqClient.interceptors.response.use(
               (response) => {
                    return response;
               },
               (error) => {
                    if (error.response) {
                         if (error.response.status === 401) {
                              localStorage.clear();
                              throw new Error("Expired Authentication");
                         }
                    }
                    throw error;
               }
          );
     }

     sendPostRequest(path, data, config = {}) {
          return this.reqClient.post(path, data, config);
     }

     sendGetRequest(path, config = {}) {
          return this.reqClient.get(path, config);
     }

     sendDeleteRequest(path, config = {}) {
          return this.reqClient.delete(path, config);
     }
}
