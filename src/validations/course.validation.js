import * as Yup from "yup";

export const createCourseSchema = Yup.object({
  courseTitle: Yup.string().min(5, "At least 5 words").required("Wajib di isi"),
  courseDesc: Yup.string()
    .min(10, "Must be greater than 10 characters")
    .required("Wajib di isi"),
  price: Yup.number().required("Required"),
  modules: Yup.array().of(
    Yup.object().shape({
      fileUrl: Yup.string().required("URL File wajib di isi"),
      moduleName: Yup.string().required("Nama modul Wajib di isi"),
      desc: Yup.string().required("Deskripsi wajib di isi"),
      isQuiz: Yup.string().default(false),
    })
  ),
});
