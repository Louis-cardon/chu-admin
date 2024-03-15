export type User = {
  id: number;
  chu_id: string;
  avatar_id: boolean;
  is_active: boolean;
};

interface DailyUserStep {
  id: number;
  userId: number;
  steps: number;
  date: string;
}

export interface UserWithSteps extends User {
  dailySteps: DailyUserStep[];
}