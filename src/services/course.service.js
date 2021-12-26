import AxiosAdapterService from "./axiosAdapter.service";

export default class CourseService extends AxiosAdapterService {
  async createCourse(payload) {
    try {
      await this.sendPostRequest("/admin/courses", payload);
    } catch (error) {
      throw new Error("Gagal membuat course: " + error.message);
    }
  }

  async getCourses(params) {
    try {
      const { data } = await this.sendGetRequest("/admin/courses", { params });

      return data;
    } catch (error) {
      throw new Error("Gagal mengambil course:" + error.message);
    }
  }
}
