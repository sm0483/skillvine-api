import { Document } from 'mongoose';
interface ICategory extends Document {
  activityHead: string;
  activity: string;
  isLeadership: boolean;
  activityPoints: {
    level1: number;
    level2: number;
    level3: number;
    level4: number;
    level5: number;
  };
  leadershipPoints: {
    coreCoordinator: number;
    subCoordinator: number;
    volunteer: number;
  };
  maxPoints: number;
  minDuration: number;
}

export default ICategory;
