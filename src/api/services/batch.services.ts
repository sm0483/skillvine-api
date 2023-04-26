import Student from '@/api/models/student.models';

class BatchServices {
  public getBatches = async () => {
    const batches = await Student.find({}).distinct('batch');
    return batches;
  };

  public getStudentByBatch = async (batch: string) => {
    const students = await Student.find({ batch }, { name: 1, _id: 1 });
    return students;
  };
  public getStudentByBatchWithDetails = async (batch: string) => {
    const students = await Student.find(
      { batch },
      { name: 1, _id: 1, ktuId: 1, batch: 1 }
    );
    return students;
  } 
}

export default BatchServices;
