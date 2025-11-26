'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Home, Play, ArrowRight, CheckCircle, Clock, Target, Zap, Star } from 'lucide-react';
import { generateWorkoutPlan } from '@/lib/calculations';
import type { UserProfile, WorkoutPlan } from '@/lib/types';

export default function PreviewPage() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [previewWorkouts, setPreviewWorkouts] = useState<WorkoutPlan[]>([]);

  useEffect(() => {
    // Load user profile from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserProfile(profile);

      // Generate preview workouts for both locations and goals
      const homeMuscleGain = generateWorkoutPlan({
        ...profile,
        trainingLocation: 'home',
        goal: 'muscle_gain'
      });

      const gymMuscleGain = generateWorkoutPlan({
        ...profile,
        trainingLocation: 'gym',
        goal: 'muscle_gain'
      });

      const homeFatLoss = generateWorkoutPlan({
        ...profile,
        trainingLocation: 'home',
        goal: 'fat_loss'
      });

      const gymFatLoss = generateWorkoutPlan({
        ...profile,
        trainingLocation: 'gym',
        goal: 'fat_loss'
      });

      setPreviewWorkouts([homeMuscleGain, gymMuscleGain, homeFatLoss, gymFatLoss]);
    } else {
      // Redirect to onboarding if no profile
      router.push('/onboarding');
    }
  }, [router]);

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Preview VidaFitPro</h1>
              <p className="text-gray-600 mt-1">Veja amostras dos treinos antes de assinar</p>
            </div>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
              Preview Gratuito
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 p-4 rounded-2xl shadow-xl">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Treinos Personalizados com IA
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Baseado no seu perfil ({userProfile.name}), criamos treinos específicos para seu objetivo e local de treino.
            Veja como seria sua rotina diária!
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Target className="w-5 h-5 text-emerald-600" />
              <span className="text-gray-700">Personalizado para você</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Zap className="w-5 h-5 text-emerald-600" />
              <span className="text-gray-700">IA Avançada</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Star className="w-5 h-5 text-emerald-600" />
              <span className="text-gray-700">Resultados Comprovados</span>
            </div>
          </div>
        </div>

        {/* Workout Previews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {previewWorkouts.map((workout, index) => (
            <Card key={index} className="shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-cyan-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{workout.name}</CardTitle>
                    <CardDescription className="text-emerald-50">
                      {workout.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {workout.exercises[0].trainingLocation === 'home' ? (
                      <Home className="w-6 h-6" />
                    ) : (
                      <Dumbbell className="w-6 h-6" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Workout Info */}
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{workout.estimatedDuration} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span>{workout.targetMuscles.join(', ')}</span>
                    </div>
                  </div>

                  {/* Sample Exercises */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Exercícios de exemplo:</h4>
                    {workout.exercises.slice(0, 3).map((exercise, exIndex) => (
                      <div key={exercise.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-emerald-700">{exIndex + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{exercise.name}</h5>
                          <p className="text-sm text-gray-600">{exercise.sets} séries × {exercise.reps} reps</p>
                          <p className="text-xs text-gray-500 mt-1">{exercise.muscleGroup}</p>
                        </div>
                        {exercise.videoUrl && (
                          <Button size="sm" variant="outline" className="flex-shrink-0">
                            <Play className="w-4 h-4 mr-1" />
                            Ver
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  {workout.exercises.length > 3 && (
                    <p className="text-sm text-gray-500 text-center">
                      + {workout.exercises.length - 3} exercícios adicionais no plano completo
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher o VidaFitPro?
            </h3>
            <p className="text-gray-600">
              Mais do que um app de treino - uma experiência completa de transformação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-br from-emerald-100 to-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Dumbbell className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Treinos com Vídeos</h4>
              <p className="text-gray-600 text-sm">
                Cada exercício vem com vídeo explicativo e demonstração profissional
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-cyan-100 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-cyan-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Acompanhamento Diário</h4>
              <p className="text-gray-600 text-sm">
                Checklist, lembretes e análise de progresso em tempo real
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Registro com Fotos</h4>
              <p className="text-gray-600 text-sm">
                Tire fotos das refeições e treinos para acompanhar sua evolução
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-3xl p-10 text-white shadow-2xl">
          <h3 className="text-4xl font-bold mb-6">
            Pronto para transformar sua vida?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Assine agora e tenha acesso completo a treinos personalizados, dieta inteligente e muito mais!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              onClick={() => router.push('/subscription')}
              className="bg-white text-emerald-600 hover:bg-gray-100 text-xl px-12 py-6 shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <CheckCircle className="mr-2 w-6 h-6" />
              Assinar VidaFitPro - R$ 29,90/mês
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-base">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>7 dias de garantia</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Cancele quando quiser</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Acesso imediato</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}