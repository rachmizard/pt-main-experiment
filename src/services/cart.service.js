import AxiosAdapterService from "./axiosAdapter.service";

export default class CartService extends AxiosAdapterService {
     async createCart(data) {
          try {
               await this.sendPostRequest("/client/cart", data);
          } catch (error) {
               throw new Error(error);
          }
     }

     async getCarts(params = {}) {
          try {
               const { data } = await this.sendGetRequest("/client/cart", {
                    params,
               });

               return data;
          } catch (error) {
               throw new Error(error);
          }
     }

     async deleteCartByCourse(course) {
          try {
               await this.sendDeleteRequest(`/client/cart/${course}/course`);
          } catch (error) {
               throw new Error(error);
          }
     }

     transformToCourseIds(data = []) {
          const carts = data.map((property) => property?.course.id);

          return carts;
     }
}
