import CertificateServices from '@/api/services/certificate.services';
import IStudent from '@/api/interfaces/IStudent.interfaces';
import ScoreServices from '@/api/services/score.services';

class ReportService {
  private certificateServices: CertificateServices = new CertificateServices();
  private scoreServices: ScoreServices = new ScoreServices();

  public getScoreByStudentWithYear = async (student: IStudent) => {
    const studentId = student._id;
    const [year1, year2, year3, year4] = await Promise.all([
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
        [`First Year (${startYear} - ${startYear + 1})`]: year1,
        [`Second Year (${startYear + 1} - ${startYear + 2})`]: year2,
        [`Third Year(${startYear + 2} - ${startYear + 3})`]: year3,
        [`Fourth Year(${startYear + 3} - ${endYear})`]: year4,
      },
    };
  };
}

export default ReportService;
