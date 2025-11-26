// Tipos do VidaFitPro

export type TrainingLocation = 'home' | 'gym';
export type Goal = 'muscle_gain' | 'fat_loss';
export type PaymentMethod = 'pix' | 'credit_card';

export interface UserProfile {
  id: string;
  name: string;
  birthDate: string;
  age: number;
  weight: number; // kg
  height: number; // cm
  trainingLocation: TrainingLocation;
  goal: Goal;
  wakeUpTime: string;
  sleepTime: string;
  subscriptionActive: boolean;
  subscriptionDate?: string;
  createdAt: string;
}

export interface WaterIntake {
  dailyGoal: number; // ml
  consumed: number; // ml
  reminders: WaterReminder[];
}

export interface WaterReminder {
  time: string;
  amount: number; // ml
  completed: boolean;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  completed: boolean;
  photoUrl?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: number; // segundos
  muscleGroup: string;
  videoUrl?: string;
  imageUrl?: string;
  instructions: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment?: string[];
}

export interface WorkoutSession {
  id: string;
  date: string;
  exercises: Exercise[];
  completed: boolean;
  photoUrl?: string;
  duration?: number; // minutos
}

export interface DailyProgress {
  date: string;
  dietCompletion: number; // 0-100
  workoutCompletion: number; // 0-100
  hydrationCompletion: number; // 0-100
  overallScore: number; // 0-100
}

export interface Subscription {
  planName: string;
  price: number;
  currency: string;
  billingCycle: 'monthly';
  features: string[];
  active: boolean;
  nextBillingDate?: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  estimatedDuration: number; // minutos
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetMuscles: string[];
}