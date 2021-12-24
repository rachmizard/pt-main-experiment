import AxiosAdapterService from "./axiosAdapter.service";

export class AuthService extends AxiosAdapterService {
  async login(email, password) {
    try {
      return await this.sendPostRequest("/auth/login", { email, password });
    } catch (error) {
      throw new Error("Something Went Wrong: Email or Password invalid");
    }
  }

  async getProfile() {
    try {
      return await this.sendGetRequest("/auth/profile");
    } catch (error) {
      throw new Error("Get Profile: " + error.message);
    }
  }
}
