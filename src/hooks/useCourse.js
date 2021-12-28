import { useState } from "react";
import CourseService from "src/services/course.service";

export default function useCourse() {
     const courseService = new CourseService();

     const [state, setState] = useState({
          loading: false,
          success: false,
          error: null,
          courses: {},
          course: {},
     });

     const handleCreateCourse = async (payload) => {
          try {
               setState((state) => ({
                    ...state,
                    loading: true,
                    success: false,
               }));
               await courseService.createCourse(payload);
          } catch (error) {
               setState((state) => ({
                    ...state,
                    loading: false,
                    success: false,
                    error: error.message,
                    courses: [],
                    course: {},
               }));

               throw new Error(error);
          } finally {
               setState((state) => ({
                    ...state,
                    loading: false,
                    success: true,
               }));
          }
     };

     const queryCourse = async (params) => {
          try {
               setState((state) => ({
                    ...state,
                    loading: true,
                    success: false,
               }));

               const data = await courseService.getCourses(params);

               setState((state) => ({ ...state, courses: data }));
          } catch (error) {
               setState((state) => ({
                    ...state,
                    loading: false,
                    success: false,
                    error: error.message,

                    courses: [],
                    course: {},
               }));
               throw new Error(error);
          } finally {
               setState((state) => ({
                    ...state,
                    loading: false,
                    success: true,
                    error: null,
               }));
          }
     };

     const getCourseById = async (id) => {
          try {
               setState((state) => ({
                    ...state,
                    loading: true,
                    success: false,
               }));

               const { data } = await courseService.getCourseById(id);

               setState((state) => ({ ...state, course: data }));
          } catch (error) {
               setState((state) => ({
                    ...state,
                    error: error.message,
                    course: {},
               }));
               throw new Error(error);
          } finally {
               setState((state) => ({
                    ...state,
                    loading: false,
                    success: true,
                    error: null,
               }));
          }
     };

     const { loading, success, error, course, courses } = state;

     return {
          loading,
          success,
          error,
          handleCreateCourse,
          queryCourse,
          courses,
          course,
          getCourseById,
     };
}
