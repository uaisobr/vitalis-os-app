// User types
export type UserRole = 'nutritionist' | 'patient';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

// Patient types
export interface Patient {
  id: string;
  user_id: string;
  nutritionist_id: string;
  birth_date: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  objectives: string;
  medical_history?: string;
  allergies?: string;
  medications?: string;
  created_at: string;
  updated_at: string;
}

// Appointment types
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  patient_id: string;
  nutritionist_id: string;
  date: string;
  time: string;
  type: 'first_consultation' | 'return' | 'bioimpedance';
  status: AppointmentStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Anthropometric Assessment types
export interface AnthropometricData {
  id: string;
  patient_id: string;
  consultation_id: string;
  date: string;
  weight: number;
  height: number;
  imc?: number;
  body_fat_percentage?: number;
  muscle_mass?: number;
  visceral_fat?: number;
  measurements: {
    neck?: number;
    chest?: number;
    waist?: number;
    hip?: number;
    right_arm?: number;
    left_arm?: number;
    right_thigh?: number;
    left_thigh?: number;
    right_calf?: number;
    left_calf?: number;
  };
  created_at: string;
  updated_at: string;
}

// Meal Plan types
export interface Food {
  id: string;
  name: string;
  calories: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
  fiber?: number;
  sodium?: number;
  unit: string;
  quantity: number;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  foods: Food[];
  substitutions?: Food[][];
  notes?: string;
}

export interface MealPlan {
  id: string;
  patient_id: string;
  nutritionist_id: string;
  name: string;
  start_date: string;
  end_date?: string;
  daily_calories: number;
  daily_proteins: number;
  daily_carbs: number;
  daily_fats: number;
  meals: Meal[];
  active: boolean;
  created_at: string;
  updated_at: string;
}

// Food Diary types
export interface FoodDiaryEntry {
  id: string;
  patient_id: string;
  date: string;
  meal_type: string;
  description: string;
  photo_url?: string;
  calories_consumed?: number;
  notes?: string;
  created_at: string;
}

// Dashboard types
export interface DashboardStats {
  totalPatients: number;
  appointmentsToday: number;
  monthlyRevenue: number;
  newPatientsMonth: number;
}