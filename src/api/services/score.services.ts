import Score from '@/api/models/score.models';

class ScoreServices {
  public getScoreByStudentId = async (id: string) => {
    const score = await Score.findOne({ studentId: id });
    return score;
  };

  public createScoreByStudentId = async (id: string) => {
    const score = await Score.create({ studentId: id });
    return score;
  };
}

export default ScoreServices;
