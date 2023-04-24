import Student from '@/api/models/student.models';

class BatchServices {
  public getBatches = async () => {
    const batches = await Student.find({}).distinct('batch');
    return batches;
  };
}

export default BatchServices;
