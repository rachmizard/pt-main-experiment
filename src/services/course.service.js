import AxiosAdapterService from "./axiosAdapter.service";

export default class CourseService extends AxiosAdapterService {
  async createCourse(payload) {
    try {
      await this.sendPostRequest("/admin/courses", payload);
    } catch (error) {
      throw new Error("Gagal membuat course: " + error.message);
    }
  }
}
