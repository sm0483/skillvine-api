import Student from '@/api/models/student.models';
import Teacher from '@/api/models/teacher.models';
import Certificate from '@/api/models/certificate.models';
import Notification from '@/api/models/notification.models';
import Score from '@/api/models/score.models';

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

  public checkKtuId = async (ktuId: string) => {
    let isPresent = false;
    const response = await Student.findOne({ ktuId });
    if (response) isPresent = true;
    return isPresent;
  };

  public checkAdmissionNumber = async (adminNumber: string) => {
    let isPresent = false;
    const response = await Student.findOne({ admissionNumber: adminNumber });
    if (response) isPresent = true;
    return isPresent;
  };

  public deleteStudentData = async (userId: string) => {
    const [studentData, certificateData] = await Promise.all([
      Student.deleteOne({ _id: userId }),
      Certificate.deleteMany({ studentId: userId }),
      Score.deleteOne({ studentId: userId }),
      Notification.deleteMany({ studentId: userId }),
    ]);
    return studentData.deletedCount >= 0 && certificateData.deletedCount > 0;
  };
}

export default AuthServices;
