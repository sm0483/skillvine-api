import ICertificate from '@/api/interfaces/ICertificate.interfaces';
import Certificate from '@/api/models/certificate.models';
import Score from '../models/score.models';

class ScoreServices {
  public getCertificates = async (id: string) => {
    const certificates = await Certificate.find({
      studentId: id,
      status: 'approved',
    });
    return certificates;
  };
  public getPoints = async (certificates: ICertificate[]) => {
    let score = 0;
    certificates.forEach((certificate) => {
      score += certificate.points;
    });
    return score;
  };

  public isPresent = async (id: string) => {
    const score = await Score.findOne({ studentId: id });
    return score;
  };

  public createScore = async (
    id: string,
    points: number,
    targetScore = 100
  ) => {
    const score = await Score.create({
      studentId: id,
      currentScore: points,
      targetScore,
    });
    return score;
  };

  public updateScore = async (id: string, points: number) => {
    const score = await Score.findOneAndUpdate(
      { studentId: id },
      { currentScore: points },
      { new: true }
    );
    return score;
  };

  public getPointsByStudentIdYear = async (id: string, year: number) => {
    const certificates = await Certificate.find({
      studentId: id,
      status: 'approved',
      year,
    });
    let score = 0;
    certificates.forEach((certificate) => {
      score += certificate.points;
    });
    return score;
  };

  public getScore = async (studentId: string) => {
    const scores = await Score.findOne({ studentId }).populate(
      'studentId',
      'name'
    );
    return scores;
  };
}

export default ScoreServices;
