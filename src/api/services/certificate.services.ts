import Certificate from '@/api/models/certificate.models';
import mongoose from 'mongoose';

class CertificateServices {
  public createCertificate = async (data: object) => {
    return Certificate.create(data);
  };

  public editCertificate = async (data: object, certificateId: string) => {
    return Certificate.findOneAndUpdate(
      { _id: certificateId },
      { ...data },
      { runValidators: true }
    );
  };

  public getCertificateById = async (certificateId: string) => {
    return Certificate.findOne({ _id: certificateId });
  };
  public getCertificateByIdAndStudentId = async (
    certificateId: string,
    studentId: string
  ) => {
    const _id = new mongoose.Types.ObjectId(certificateId);
    return Certificate.aggregate([
      {
        $match: {
          studentId,
          _id,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $lookup: {
          from: 'teachers',
          localField: 'lastVerifiedBy',
          foreignField: '_id',
          as: 'lastVerifiedBy',
        },
      },
      {
        $unwind: {
          path: '$lastVerifiedBy',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          certificateName: 1,
          studentId: 1,
          level: 1,
          duration: 1,
          year: 1,
          status: 1,
          certificateUrl: 1,
          certificateDescription: 1,
          createdAt: 1,
          updatedAt: 1,
          category: {
            _id: 1,
            activityHead: 1,
            activity: 1,
          },
          lastVerifiedBy: {
            _id: 1,
            name: 1,
          },
          isLeadership: 1,
          leadershipLevel: 1,
        },
      },
    ]);
  };

  public getCertificatesByStudentId = async (studentId: string) => {
    return Certificate.aggregate([
      {
        $match: {
          studentId,
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $lookup: {
          from: 'teachers',
          localField: 'lastVerifiedBy',
          foreignField: '_id',
          as: 'lastVerifiedBy',
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $unwind: {
          path: '$lastVerifiedBy',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          certificateName: 1,
          level: 1,
          duration: 1,
          year: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          category: {
            _id: 1,
            activityHead: 1,
            activity: 1,
          },

          lastVerifiedBy: {
            _id: 1,
            name: 1,
          },
          isLeadership: 1,
          leadershipLevel: 1,
        },
      },
    ]);
  };

  public getCertificatesByStudentIdAndYear = async (
    studentId: string,
    year: number
  ) => {
    return Certificate.aggregate([
      {
        $match: {
          studentId,
          year,
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $lookup: {
          from: 'teachers',
          localField: 'lastVerifiedBy',
          foreignField: '_id',
          as: 'lastVerifiedBy',
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $unwind: {
          path: '$lastVerifiedBy',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          certificateName: 1,
          level: 1,
          duration: 1,
          year: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          category: {
            _id: 1,
            activityHead: 1,
            activity: 1,
          },

          lastVerifiedBy: {
            _id: 1,
            name: 1,
          },
          isLeadership: 1,
          leadershipLevel: 1,
        },
      },
    ]);
  };
  

}

export default CertificateServices;
