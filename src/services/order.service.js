import AxiosAdapterService from "./axiosAdapter.service";

export default class OrderService extends AxiosAdapterService {
     async createOrder(payload) {
          try {
               const { data } = await this.sendPostRequest(
                    "/client/orders",
                    payload
               );
               return data;
          } catch (error) {
               throw new Error("Create Order: " + error.message);
          }
     }

     async getOrders(params = {}) {
          try {
               const { data } = await this.sendGetRequest("/client/orders", {
                    params,
               });
               return data;
          } catch (error) {
               throw new Error("Get Order: " + error.message);
          }
     }
}
