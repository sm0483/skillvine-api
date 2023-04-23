import Student from '@/api/models/student.models';
import Teacher from '@/api/models/teacher.models';

class AuthServices {
  public updateStudent = async (data, studentId: string) => {
    const studentUpdate = await Student.findOneAndUpdate(
      { _id: studentId },
      { ...data },
      { runValidators: true, new: true }
    );

    return studentUpdate;
  };

  public getStudent = async (studentId: string) => {
    const student = await Student.findById(studentId);
    return student;
  };

  public getTeacher = async (teacherId: string) => {
    const teacher = await Teacher.findById(teacherId);
    return teacher;
  };
}

export default AuthServices;
