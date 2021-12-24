import { useState } from "react";
import CourseService from "src/services/course.service";

export default function useCourse() {
  const courseService = new CourseService();

  const [state, setState] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleCreateCourse = async (payload) => {
    try {
      setState((state) => ({ ...state, loading: true, success: false }));
      await courseService.createCourse(payload);
    } catch (error) {
      setState((state) => ({
        ...state,
        loading: false,
        success: false,
        error: error.message,
      }));

      throw new Error(error);
    } finally {
      setState((state) => ({ ...state, loading: false, success: true }));
    }
  };

  const { loading, success, error } = state;

  return {
    loading,
    success,
    error,
    handleCreateCourse,
  };
}
