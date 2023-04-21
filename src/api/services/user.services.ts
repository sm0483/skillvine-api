import Student from '@/api/models/student.models';

class AuthServices {
  public updateStudent = async (data, studentId: string) => {
    const studentUpdate = await Student.findOneAndUpdate(
      { _id: studentId },
      { ...data },
      { runValidators: true, new: true }
    );

    return studentUpdate;
  };
}

export default AuthServices;
