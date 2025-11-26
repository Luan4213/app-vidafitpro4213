import { z } from 'zod'

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

export type DietFormData = z.infer<typeof dietFormSchema>

export interface NutritionData {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface Meal {
  name: string
  time: string
  foods: Array<{
    food_id: string
    name: string
    quantity: number
    calories: number
    protein: number
    carbs: number
    fat: number
  }>
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
}

export interface Food {
  id: string
  name: string
  calories_per_100g: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  category: string
}

// Calcular TMB usando Mifflin-St Jeor
export function calculateBMR(age: number, weight: number, height: number, gender: 'male' | 'female'): number {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161
  }
}

// Calcular calorias totais baseado no nível de atividade
export function calculateTDEE(bmr: number, activityLevel: string): number {
  const multipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extremely_active: 1.9
  }
  return bmr * (multipliers[activityLevel as keyof typeof multipliers] || 1.2)
}

// Calcular macros baseado no objetivo
export function calculateMacros(calories: number, goal: string): NutritionData {
  let proteinRatio = 0.2 // 20% protein
  let fatRatio = 0.25 // 25% fat
  let carbRatio = 0.55 // 55% carbs

  if (goal === 'muscle_gain') {
    proteinRatio = 0.25
    fatRatio = 0.2
    carbRatio = 0.55
    calories += 300 // superávit
  } else if (goal === 'weight_loss') {
    proteinRatio = 0.3
    fatRatio = 0.2
    carbRatio = 0.5
    calories -= 500 // déficit
  } else if (goal === 'maintenance') {
    // manter proporções padrão
  }

  return {
    calories: Math.round(calories),
    protein: Math.round((calories * proteinRatio) / 4), // 4 cal/g
    carbs: Math.round((calories * carbRatio) / 4), // 4 cal/g
    fat: Math.round((calories * fatRatio) / 9) // 9 cal/g
  }
}

// Gerar refeições diárias com alimentos selecionados
export function generateMeals(dailyCalories: number, goal: string, foods: Food[]): Meal[] {
  const meals: Meal[] = [
    { name: 'Café da Manhã', time: '07:00', foods: [], totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 },
    { name: 'Lanche da Manhã', time: '10:00', foods: [], totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 },
    { name: 'Almoço', time: '12:00', foods: [], totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 },
    { name: 'Lanche da Tarde', time: '15:00', foods: [], totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 },
    { name: 'Jantar', time: '19:00', foods: [], totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 },
    { name: 'Ceia', time: '21:00', foods: [], totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 }
  ]

  // Distribuição de calorias por refeição
  const distribution = [0.25, 0.1, 0.3, 0.1, 0.2, 0.05] // percentuais

  meals.forEach((meal, index) => {
    meal.totalCalories = Math.round(dailyCalories * distribution[index])
  })

  // Selecionar alimentos por categoria
  const proteins = foods.filter(f => f.category === 'proteina')
  const carbs = foods.filter(f => f.category === 'carboidrato')
  const fruits = foods.filter(f => f.category === 'fruta')
  const veggies = foods.filter(f => f.category === 'verdura')
  const supplements = foods.filter(f => f.category === 'suplemento')

  // Café da manhã: carb + fruta + proteína
  if (carbs.length > 0 && fruits.length > 0 && proteins.length > 0) {
    const carb = carbs[0]
    const fruit = fruits[0]
    const protein = proteins[0]

    const carbQty = Math.min(50, Math.round((meals[0].totalCalories * 0.4) / (carb.calories_per_100g / 100)))
    const fruitQty = Math.min(100, Math.round((meals[0].totalCalories * 0.3) / (fruit.calories_per_100g / 100)))
    const proteinQty = Math.min(30, Math.round((meals[0].totalCalories * 0.3) / (protein.calories_per_100g / 100)))

    meals[0].foods = [
      {
        food_id: carb.id,
        name: carb.name,
        quantity: carbQty,
        calories: (carb.calories_per_100g * carbQty) / 100,
        protein: (carb.protein * carbQty) / 100,
        carbs: (carb.carbs * carbQty) / 100,
        fat: (carb.fat * carbQty) / 100
      },
      {
        food_id: fruit.id,
        name: fruit.name,
        quantity: fruitQty,
        calories: (fruit.calories_per_100g * fruitQty) / 100,
        protein: (fruit.protein * fruitQty) / 100,
        carbs: (fruit.carbs * fruitQty) / 100,
        fat: (fruit.fat * fruitQty) / 100
      },
      {
        food_id: protein.id,
        name: protein.name,
        quantity: proteinQty,
        calories: (protein.calories_per_100g * proteinQty) / 100,
        protein: (protein.protein * proteinQty) / 100,
        carbs: (protein.carbs * proteinQty) / 100,
        fat: (protein.fat * proteinQty) / 100
      }
    ]
  }

  // Almoço: proteína + carb + verdura
  if (proteins.length > 1 && carbs.length > 1 && veggies.length > 0) {
    const protein = proteins[1]
    const carb = carbs[1]
    const veggie = veggies[0]

    const proteinQty = Math.min(150, Math.round((meals[2].totalCalories * 0.4) / (protein.calories_per_100g / 100)))
    const carbQty = Math.min(100, Math.round((meals[2].totalCalories * 0.4) / (carb.calories_per_100g / 100)))
    const veggieQty = Math.min(100, Math.round((meals[2].totalCalories * 0.2) / (veggie.calories_per_100g / 100)))

    meals[2].foods = [
      {
        food_id: protein.id,
        name: protein.name,
        quantity: proteinQty,
        calories: (protein.calories_per_100g * proteinQty) / 100,
        protein: (protein.protein * proteinQty) / 100,
        carbs: (protein.carbs * proteinQty) / 100,
        fat: (protein.fat * proteinQty) / 100
      },
      {
        food_id: carb.id,
        name: carb.name,
        quantity: carbQty,
        calories: (carb.calories_per_100g * carbQty) / 100,
        protein: (carb.protein * carbQty) / 100,
        carbs: (carb.carbs * carbQty) / 100,
        fat: (carb.fat * carbQty) / 100
      },
      {
        food_id: veggie.id,
        name: veggie.name,
        quantity: veggieQty,
        calories: (veggie.calories_per_100g * veggieQty) / 100,
        protein: (veggie.protein * veggieQty) / 100,
        carbs: (veggie.carbs * veggieQty) / 100,
        fat: (veggie.fat * veggieQty) / 100
      }
    ]
  }

  // Jantar similar ao almoço
  if (proteins.length > 2 && carbs.length > 2 && veggies.length > 1) {
    const protein = proteins[2]
    const carb = carbs[2]
    const veggie = veggies[1]

    const proteinQty = Math.min(150, Math.round((meals[4].totalCalories * 0.4) / (protein.calories_per_100g / 100)))
    const carbQty = Math.min(100, Math.round((meals[4].totalCalories * 0.4) / (carb.calories_per_100g / 100)))
    const veggieQty = Math.min(100, Math.round((meals[4].totalCalories * 0.2) / (veggie.calories_per_100g / 100)))

    meals[4].foods = [
      {
        food_id: protein.id,
        name: protein.name,
        quantity: proteinQty,
        calories: (protein.calories_per_100g * proteinQty) / 100,
        protein: (protein.protein * proteinQty) / 100,
        carbs: (protein.carbs * proteinQty) / 100,
        fat: (protein.fat * proteinQty) / 100
      },
      {
        food_id: carb.id,
        name: carb.name,
        quantity: carbQty,
        calories: (carb.calories_per_100g * carbQty) / 100,
        protein: (carb.protein * carbQty) / 100,
        carbs: (carb.carbs * carbQty) / 100,
        fat: (carb.fat * carbQty) / 100
      },
      {
        food_id: veggie.id,
        name: veggie.name,
        quantity: veggieQty,
        calories: (veggie.calories_per_100g * veggieQty) / 100,
        protein: (veggie.protein * veggieQty) / 100,
        carbs: (veggie.carbs * veggieQty) / 100,
        fat: (veggie.fat * veggieQty) / 100
      }
    ]
  }

  // Calcular totais por refeição
  meals.forEach(meal => {
    meal.totalCalories = meal.foods.reduce((sum, food) => sum + food.calories, 0)
    meal.totalProtein = meal.foods.reduce((sum, food) => sum + food.protein, 0)
    meal.totalCarbs = meal.foods.reduce((sum, food) => sum + food.carbs, 0)
    meal.totalFat = meal.foods.reduce((sum, food) => sum + food.fat, 0)
  })

  return meals
}