import IStudent from '@/api/interfaces/IStudent.interfaces';
import ScoreServices from '@/api/services/score.services';
import CertificateServices from '@/api/services/certificate.services';
import IScore from '@/api/interfaces/IScore.interfaces';

class ReportService {
  private scoreServices: ScoreServices = new ScoreServices();
  private certificateServices: CertificateServices = new CertificateServices();

  public getScoreByStudentWithYear = async (student: IStudent) => {
    const studentId = student._id;
    const [scoreYear1, scoreYear2, scoreYear3, scoreYear4] = await Promise.all([
      this.scoreServices.getPointsByStudentIdYear(studentId, 1),
      this.scoreServices.getPointsByStudentIdYear(studentId, 2),
      this.scoreServices.getPointsByStudentIdYear(studentId, 3),
      this.scoreServices.getPointsByStudentIdYear(studentId, 4),
    ]);
    const batch = student.batch;
    const startYear = parseInt(batch.split('-')[0]);
    const endYear = parseInt(batch.split('-')[1]);

    return {
      student,
      points: {
        [`First Year (${startYear} - ${startYear + 1})`]: scoreYear1,
        [`Second Year (${startYear + 1} - ${startYear + 2})`]: scoreYear2,
        [`Third Year(${startYear + 2} - ${startYear + 3})`]: scoreYear3,
        [`Fourth Year(${startYear + 3} - ${endYear})`]: scoreYear4,
        [`Total Score`]: scoreYear1 + scoreYear2 + scoreYear3 + scoreYear4,
      },
    };
  };

  public getReportStudent = async (student: IStudent) => {
    const studentId = student._id;
    const [
      score,
      scoreYear1,
      scoreYear2,
      scoreYear3,
      scoreYear4,
      approvedYear1,
      approvedYear2,
      approvedYear3,
      approvedYear4,
    ] = await Promise.all([
      this.scoreServices.getScore(studentId),
      this.scoreServices.getPointsByStudentIdYear(studentId, 1),
      this.scoreServices.getPointsByStudentIdYear(studentId, 2),
      this.scoreServices.getPointsByStudentIdYear(studentId, 3),
      this.scoreServices.getPointsByStudentIdYear(studentId, 4),
      this.certificateServices.getApprovedCertificateByStudentIdYear(
        studentId,
        1
      ),
      this.certificateServices.getApprovedCertificateByStudentIdYear(
        studentId,
        2
      ),
      this.certificateServices.getApprovedCertificateByStudentIdYear(
        studentId,
        3
      ),
      this.certificateServices.getApprovedCertificateByStudentIdYear(
        studentId,
        4
      ),
    ]);

    const scoreDetails: IScore = score;

    const newStudent = {
      name: student.name,
      batch: student.batch,
      ktuId: student.ktuId,
      admissionNumber: student.admissionNumber,
      currentScore: scoreDetails.currentScore,
      targetScore: scoreDetails.targetScore,
    };

    return {
      student: newStudent,
      'First Year': {
        'Total Score': scoreYear1,
        Approved: approvedYear1,
      },
      'Second Year': {
        'Total Score': scoreYear2,
        Approved: approvedYear2,
      },
      'Third Year': {
        'Total Score': scoreYear3,
        Approved: approvedYear3,
      },
      'Fourth Year': {
        'Total Score': scoreYear4,
        Approved: approvedYear4,
      },
    };
  };
}

export default ReportService;
