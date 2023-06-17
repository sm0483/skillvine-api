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

  public getCertificateByIdPopulate = async (certificateId: string) => {
    const _id = new mongoose.Types.ObjectId(certificateId);
    return Certificate.aggregate([
      {
        $match: {
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
          participationDate: 1,
          points: 1,
          remarks: 1,
        },
      },
    ]);
  };
  public getCertificateByIdAndStudentId = async (
    certificateId: string,
    studentId: string
  ) => {
    const _id = new mongoose.Types.ObjectId(certificateId);
    const id = new mongoose.Types.ObjectId(studentId);
    return Certificate.aggregate([
      {
        $match: {
          studentId: id,
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
          participationDate: 1,
          points: 1,
          remarks: 1,
        },
      },
    ]);
  };

  public getCertificatesByStudentId = async (studentId: string) => {
    const id = new mongoose.Types.ObjectId(studentId);
    return Certificate.aggregate([
      {
        $match: {
          studentId: id,
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
          participationDate: 1,
          points: 1,
          remarks: 1,
        },
      },
    ]);
  };

  public getCertificatesByStudentIdAndYear = async (
    studentId: string,
    year: number
  ) => {
    const id = new mongoose.Types.ObjectId(studentId);
    return Certificate.aggregate([
      {
        $match: {
          studentId: id,
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
          isLeadership: 1,
          leadershipLevel: 1,
          participationDate: 1,
          points: 1,
          remarks: 1,
        },
      },
    ]);
  };

  public getCertByStuIdCatIdYearSta = async (
    studentId: mongoose.Schema.Types.ObjectId,
    categoryId: string,
    year: number,
    certificateId: string
  ) => {
    const certificate = await Certificate.findOne({
      studentId,
      categoryId,
      year,
      _id: { $ne: certificateId },
      $or: [{ status: 'approved' }, { status: 'unapplied' }],
    });

    return certificate;
  };

  deleteCertificate = async (certificateId: string, studentId: string) => {
    return Certificate.findOneAndDelete({ _id: certificateId, studentId });
  };

  public getApprovedCertificateByStudentIdYear = async (
    studentId: string,
    year: number
  ) => {
    const certificates = await Certificate.find(
      {
        studentId,
        year,
        status: 'approved',
      },
      {
        points: 1,
        categoryId: 1,
        level: 1,
        isLeadership: 1,
        leadershipLevel: 1,
        certificateName: 1,
        participationDate: 1,
      }
    ).populate('categoryId', 'activityHead activity');

    const formattedCertificates = certificates.map((certificate) => {
      const formattedDate = certificate.participationDate.toLocaleDateString(
        'en-US',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }
      );
      return {
        ...certificate.toObject(),
        participationDate: formattedDate,
      };
    });

    return formattedCertificates;
  };
}

export default CertificateServices;
