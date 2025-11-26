import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export const signupSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  fullName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
})

export const dietFormSchema = z.object({
  age: z.number().min(10).max(120),
  weight: z.number().min(30).max(300),
  height: z.number().min(100).max(250),
  gender: z.enum(['male', 'female']),
  wakeUpTime: z.string(),
  sleepTime: z.string(),
  routine: z.string(),
  foodPreferences: z.string(),
  activityLevel: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active']),
  trainingLocation: z.enum(['home', 'gym']),
  goal: z.enum(['weight_loss', 'muscle_gain', 'maintenance', 'health', 'specific']),
  specificGoal: z.string().optional(),
})

export const profileSchema = z.object({
  age: z.number().min(10).max(120),
  weight: z.number().min(30).max(300),
  height: z.number().min(100).max(250),
  gender: z.enum(['male', 'female']),
  wakeUpTime: z.string(),
  sleepTime: z.string(),
  routine: z.string(),
  foodPreferences: z.string(),
  activityLevel: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active']),
  trainingLocation: z.enum(['home', 'gym']),
  goal: z.enum(['weight_loss', 'muscle_gain', 'maintenance', 'health', 'specific']),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>
export type DietFormData = z.infer<typeof dietFormSchema>
export type ProfileFormData = z.infer<typeof profileSchema>