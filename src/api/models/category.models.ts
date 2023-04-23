import mongoose from 'mongoose';
import ICategory from '@/api/interfaces/ICategory.interfaces';

const categorySchema = new mongoose.Schema<ICategory>({
  activityHead: {
    type: String,
    required: true,
  },
  activity: {
    type: String,
    required: true,
  },
  isLeadership: {
    type: Boolean,
    default: false,
  },
  activityPoints: {
    type: {
      level1: {
        type: Number,
      },
      level2: {
        type: Number,
      },
      level3: {
        type: Number,
      },
      level4: {
        type: Number,
      },
      level5: {
        type: Number,
      },
    },
  },
  leadershipPoints: {
    type: {
      coreCoordinator: {
        type: Number,
        default: null,
      },
      subCoordinator: {
        type: Number,
        default: null,
      },
      volunteer: {
        type: Number,
        default: null,
      },
    },
  },
  maxPoints: {
    type: Number,
    required: true,
  },
  minDuration: {
    type: Number,
    required: true,
  },
});

const Category = mongoose.model<ICategory>('Category', categorySchema);
export default Category;
