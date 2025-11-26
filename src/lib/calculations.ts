// Cálculos e utilitários do VidaFitPro

import type { Exercise, WorkoutPlan, UserProfile, Goal, TrainingLocation } from './types';

/**
 * Calcula a quantidade ideal de água diária (ml)
 * Fórmula: 35ml por kg de peso corporal
 */
export function calculateDailyWaterIntake(weight: number): number {
  return Math.round(weight * 35);
}

/**
 * Calcula o IMC (Índice de Massa Corporal)
 */
export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

/**
 * Calcula a idade com base na data de nascimento
 */
export function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

/**
 * Calcula o TMB (Taxa Metabólica Basal) usando a fórmula de Harris-Benedict
 */
export function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  if (gender === 'male') {
    return Math.round(88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age));
  } else {
    return Math.round(447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age));
  }
}

/**
 * Calcula calorias diárias recomendadas baseado no objetivo
 */
export function calculateDailyCalories(
  weight: number,
  height: number,
  age: number,
  goal: 'muscle_gain' | 'fat_loss',
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' = 'moderate'
): number {
  // Assumindo gênero masculino como padrão (pode ser expandido)
  const bmr = calculateBMR(weight, height, age, 'male');

  // Multiplicadores de atividade
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725
  };

  const tdee = bmr * activityMultipliers[activityLevel];

  // Ajuste baseado no objetivo
  if (goal === 'muscle_gain') {
    return Math.round(tdee + 300); // Superávit calórico
  } else {
    return Math.round(tdee - 500); // Déficit calórico
  }
}

/**
 * Divide a ingestão de água em lembretes ao longo do dia
 */
export function generateWaterReminders(
  totalWater: number,
  wakeUpTime: string,
  sleepTime: string
): { time: string; amount: number }[] {
  const [wakeHour, wakeMin] = wakeUpTime.split(':').map(Number);
  const [sleepHour, sleepMin] = sleepTime.split(':').map(Number);

  const wakeMinutes = wakeHour * 60 + wakeMin;
  const sleepMinutes = sleepHour * 60 + sleepMin;

  const awakeMinutes = sleepMinutes > wakeMinutes
    ? sleepMinutes - wakeMinutes
    : (24 * 60 - wakeMinutes) + sleepMinutes;

  // Dividir em 8 lembretes ao longo do dia
  const reminderCount = 8;
  const intervalMinutes = Math.floor(awakeMinutes / reminderCount);
  const amountPerReminder = Math.round(totalWater / reminderCount);

  const reminders = [];

  for (let i = 0; i < reminderCount; i++) {
    const totalMinutes = wakeMinutes + (intervalMinutes * i);
    const hour = Math.floor(totalMinutes / 60) % 24;
    const minute = totalMinutes % 60;

    reminders.push({
      time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
      amount: amountPerReminder
    });
  }

  return reminders;
}

/**
 * Formata valores monetários em Real brasileiro
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

/**
 * Calcula o percentual de progresso diário
 */
export function calculateDailyProgress(
  mealsCompleted: number,
  totalMeals: number,
  workoutsCompleted: number,
  totalWorkouts: number,
  waterConsumed: number,
  waterGoal: number
): {
  diet: number;
  workout: number;
  hydration: number;
  overall: number;
} {
  const diet = totalMeals > 0 ? Math.round((mealsCompleted / totalMeals) * 100) : 0;
  const workout = totalWorkouts > 0 ? Math.round((workoutsCompleted / totalWorkouts) * 100) : 0;
  const hydration = waterGoal > 0 ? Math.round((waterConsumed / waterGoal) * 100) : 0;
  const overall = Math.round((diet + workout + hydration) / 3);

  return { diet, workout, hydration, overall };
}

/**
 * Gera exercícios baseados no local de treino e objetivo
 */
function generateExercises(trainingLocation: TrainingLocation, goal: Goal): Exercise[] {
  const exercises: Exercise[] = [];

  if (trainingLocation === 'home') {
    // Exercícios funcionais para casa
    if (goal === 'muscle_gain') {
      exercises.push(
        {
          id: '1',
          name: 'Flexão de Braço',
          sets: 4,
          reps: '8-12',
          rest: 90,
          muscleGroup: 'Peito, Ombros, Tríceps',
          videoUrl: 'https://www.youtube.com/embed/IODxDxX7oi4',
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          instructions: 'Posicione as mãos no chão, ligeiramente mais largas que os ombros. Desça o corpo até o peito quase tocar o chão, depois empurre para cima.',
          difficulty: 'intermediate',
          equipment: []
        },
        {
          id: '2',
          name: 'Agachamento',
          sets: 4,
          reps: '10-15',
          rest: 60,
          muscleGroup: 'Quadríceps, Glúteos',
          videoUrl: 'https://www.youtube.com/embed/aclHkVaku9U',
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          instructions: 'Fique em pé com os pés na largura dos ombros. Desça como se fosse sentar em uma cadeira, mantendo os joelhos alinhados com os pés.',
          difficulty: 'beginner',
          equipment: []
        },
        {
          id: '3',
          name: 'Prancha',
          sets: 3,
          reps: '30-60 segundos',
          rest: 45,
          muscleGroup: 'Core',
          videoUrl: 'https://www.youtube.com/embed/ASdvN_XEl_c',
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          instructions: 'Deite de barriga para baixo, apoie-se nos antebraços e pontas dos pés. Mantenha o corpo reto como uma prancha.',
          difficulty: 'intermediate',
          equipment: []
        },
        {
          id: '4',
          name: 'Burpee',
          sets: 3,
          reps: '8-10',
          rest: 90,
          muscleGroup: 'Corpo Inteiro',
          videoUrl: 'https://www.youtube.com/embed/TU8QYVW0gDU',
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          instructions: 'Comece em pé, agache, chute as pernas para trás, faça uma flexão, volte as pernas e pule para cima.',
          difficulty: 'advanced',
          equipment: []
        }
      );
    } else { // fat_loss
      exercises.push(
        {
          id: '5',
          name: 'Corrida Estacionária',
          sets: 1,
          reps: '10 minutos',
          rest: 0,
          muscleGroup: 'Corpo Inteiro',
          videoUrl: 'https://www.youtube.com/embed/lwaTFXPX8Ko',
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          instructions: 'Corra no lugar elevando os joelhos o máximo possível, mantendo um ritmo constante.',
          difficulty: 'beginner',
          equipment: []
        },
        {
          id: '6',
          name: 'Mountain Climber',
          sets: 3,
          reps: '30 segundos',
          rest: 30,
          muscleGroup: 'Core, Pernas',
          videoUrl: 'https://www.youtube.com/embed/kLh-uczlPLg',
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          instructions: 'Em posição de prancha, alterne trazendo os joelhos em direção ao peito rapidamente.',
          difficulty: 'intermediate',
          equipment: []
        },
        {
          id: '7',
          name: 'Jumping Jacks',
          sets: 3,
          reps: '50 repetições',
          rest: 45,
          muscleGroup: 'Corpo Inteiro',
          videoUrl: 'https://www.youtube.com/embed/iSSAk4XCsRA',
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          instructions: 'Pule abrindo as pernas e levantando os braços acima da cabeça, depois volte à posição inicial.',
          difficulty: 'beginner',
          equipment: []
        }
      );
    }
  } else { // gym
    if (goal === 'muscle_gain') {
      exercises.push(
        {
          id: '8',
          name: 'Supino Reto',
          sets: 4,
          reps: '8-12',
          rest: 120,
          muscleGroup: 'Peito',
          videoUrl: 'https://www.youtube.com/embed/gRVjAtPip0Y',
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          instructions: 'Deite no banco, segure a barra com as mãos na largura dos ombros. Desça o peso até o peito, depois empurre para cima.',
          difficulty: 'intermediate',
          equipment: ['Barra', 'Banco']
        },
        {
          id: '9',
          name: 'Agachamento Livre',
          sets: 4,
          reps: '8-10',
          rest: 120,
          muscleGroup: 'Quadríceps, Glúteos',
          videoUrl: 'https://www.youtube.com/embed/Dy28eq2PjcM',
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          instructions: 'Coloque a barra nos ombros, pés na largura dos ombros. Desça até os quadríceps ficarem paralelos ao chão.',
          difficulty: 'intermediate',
          equipment: ['Barra', 'Suporte']
        },
        {
          id: '10',
          name: 'Puxada na Barra',
          sets: 4,
          reps: '8-12',
          rest: 90,
          muscleGroup: 'Costas',
          videoUrl: 'https://www.youtube.com/embed/hCDzSR6bW10',
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          instructions: 'Segure a barra com as mãos afastadas. Puxe o corpo para cima até o queixo passar da barra.',
          difficulty: 'intermediate',
          equipment: ['Barra fixa']
        }
      );
    } else { // fat_loss
      exercises.push(
        {
          id: '11',
          name: 'Esteira',
          sets: 1,
          reps: '20-30 minutos',
          rest: 0,
          muscleGroup: 'Corpo Inteiro',
          videoUrl: 'https://www.youtube.com/embed/ml6cT4AZdqI',
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          instructions: 'Corra ou caminhe na esteira mantendo um ritmo constante para queimar calorias.',
          difficulty: 'beginner',
          equipment: ['Esteira']
        },
        {
          id: '12',
          name: 'Remada Baixa',
          sets: 3,
          reps: '12-15',
          rest: 60,
          muscleGroup: 'Costas',
          videoUrl: 'https://www.youtube.com/embed/vT2LjZe6KgE',
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          instructions: 'Sente na máquina, segure as alças. Puxe para trás trazendo as escápulas juntas.',
          difficulty: 'beginner',
          equipment: ['Máquina de remada']
        },
        {
          id: '13',
          name: 'Leg Press',
          sets: 3,
          reps: '15-20',
          rest: 60,
          muscleGroup: 'Quadríceps, Glúteos',
          videoUrl: 'https://www.youtube.com/embed/s_6xT2J9ZWI',
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          instructions: 'Sente na máquina, coloque os pés na plataforma. Estenda as pernas sem trancar os joelhos.',
          difficulty: 'beginner',
          equipment: ['Leg Press']
        }
      );
    }
  }

  return exercises;
}

/**
 * Gera um plano de treino personalizado baseado no perfil do usuário
 */
export function generateWorkoutPlan(userProfile: UserProfile): WorkoutPlan {
  const exercises = generateExercises(userProfile.trainingLocation, userProfile.goal);

  const planName = userProfile.goal === 'muscle_gain'
    ? 'Treino de Hipertrofia'
    : 'Treino de Emagrecimento';

  const description = userProfile.trainingLocation === 'home'
    ? `Treino funcional para fazer em casa, focado em ${userProfile.goal === 'muscle_gain' ? 'ganho de massa muscular' : 'perda de gordura'}.`
    : `Treino em academia com equipamentos, otimizado para ${userProfile.goal === 'muscle_gain' ? 'hipertrofia' : 'queima calórica'}.`;

  const estimatedDuration = exercises.reduce((total, exercise) => {
    return total + (exercise.sets * 45) + (exercise.rest * exercise.sets); // 45s por série + descanso
  }, 0) / 60; // em minutos

  const targetMuscles = [...new Set(exercises.map(ex => ex.muscleGroup))];

  return {
    id: `workout-${Date.now()}`,
    name: planName,
    description,
    exercises,
    estimatedDuration: Math.round(estimatedDuration),
    difficulty: 'intermediate',
    targetMuscles
  };
}