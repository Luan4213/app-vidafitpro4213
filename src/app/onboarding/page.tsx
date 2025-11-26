'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Dumbbell, Home, Target, Clock, User, Calendar, Weight, Ruler } from 'lucide-react';
import { calculateAge } from '@/lib/calculations';
import type { TrainingLocation, Goal } from '@/lib/types';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    weight: '',
    height: '',
    trainingLocation: '' as TrainingLocation,
    goal: '' as Goal,
    wakeUpTime: '',
    sleepTime: '',
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Salvar dados e redirecionar para preview
      const age = calculateAge(formData.birthDate);
      localStorage.setItem('userProfile', JSON.stringify({ ...formData, age }));
      router.push('/preview');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 p-4 rounded-2xl w-16 h-16 mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Bem-vindo ao VidaFitPro!</CardTitle>
              <CardDescription>Primeiro, vamos nos conhecer melhor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  placeholder="Digite seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="birthDate">Data de nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 p-4 rounded-2xl w-16 h-16 mx-auto mb-4">
                <Home className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Onde você treina?</CardTitle>
              <CardDescription>Escolha o local que melhor se adapta à sua rotina</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.trainingLocation}
                onValueChange={(value) => setFormData({ ...formData, trainingLocation: value as TrainingLocation })}
                className="space-y-4"
              >
                <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="home" id="home" />
                  <div className="flex items-center gap-3">
                    <Home className="w-6 h-6 text-emerald-600" />
                    <div>
                      <Label htmlFor="home" className="font-semibold cursor-pointer">Treino em Casa</Label>
                      <p className="text-sm text-gray-600">Exercícios funcionais sem equipamentos</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="gym" id="gym" />
                  <div className="flex items-center gap-3">
                    <Dumbbell className="w-6 h-6 text-emerald-600" />
                    <div>
                      <Label htmlFor="gym" className="font-semibold cursor-pointer">Academia</Label>
                      <p className="text-sm text-gray-600">Treinos com aparelhos e pesos</p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 p-4 rounded-2xl w-16 h-16 mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Qual seu objetivo?</CardTitle>
              <CardDescription>Isso nos ajuda a personalizar seu plano</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.goal}
                onValueChange={(value) => setFormData({ ...formData, goal: value as Goal })}
                className="space-y-4"
              >
                <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="muscle_gain" id="muscle_gain" />
                  <div className="flex items-center gap-3">
                    <Dumbbell className="w-6 h-6 text-emerald-600" />
                    <div>
                      <Label htmlFor="muscle_gain" className="font-semibold cursor-pointer">Ganho de Massa Muscular</Label>
                      <p className="text-sm text-gray-600">Treinos de hipertrofia e dieta calórica</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="fat_loss" id="fat_loss" />
                  <div className="flex items-center gap-3">
                    <Target className="w-6 h-6 text-emerald-600" />
                    <div>
                      <Label htmlFor="fat_loss" className="font-semibold cursor-pointer">Perda de Gordura</Label>
                      <p className="text-sm text-gray-600">Treinos HIIT e dieta deficitária</p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 p-4 rounded-2xl w-16 h-16 mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Sua rotina diária</CardTitle>
              <CardDescription>Para otimizar lembretes e hidratação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="wakeUpTime">Horário que você acorda</Label>
                <Input
                  id="wakeUpTime"
                  type="time"
                  value={formData.wakeUpTime}
                  onChange={(e) => setFormData({ ...formData, wakeUpTime: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="sleepTime">Horário que você dorme</Label>
                <Input
                  id="sleepTime"
                  type="time"
                  value={formData.sleepTime}
                  onChange={(e) => setFormData({ ...formData, sleepTime: e.target.value })}
                />
              </div>
              {formData.wakeUpTime && formData.sleepTime && (
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <p className="text-sm text-emerald-700">
                    <strong>Horas acordado:</strong> Calcularemos automaticamente sua ingestão de água e lembretes baseados nessa rotina.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 p-4 rounded-2xl w-16 h-16 mx-auto mb-4">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Tudo pronto!</CardTitle>
              <CardDescription>Confirme seus dados antes de continuar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nome:</span>
                  <span className="font-semibold">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Idade:</span>
                  <span className="font-semibold">{formData.birthDate ? calculateAge(formData.birthDate) : ''} anos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Peso/Altura:</span>
                  <span className="font-semibold">{formData.weight}kg / {formData.height}cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Local:</span>
                  <span className="font-semibold">{formData.trainingLocation === 'home' ? 'Casa' : 'Academia'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Objetivo:</span>
                  <span className="font-semibold">{formData.goal === 'muscle_gain' ? 'Ganho de Massa' : 'Perda de Gordura'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rotina:</span>
                  <span className="font-semibold">{formData.wakeUpTime} - {formData.sleepTime}</span>
                </div>
              </div>
              <div className="p-4 bg-emerald-50 rounded-lg">
                <p className="text-sm text-emerald-700 text-center">
                  Agora vamos mostrar uma prévia dos seus treinos personalizados!
                </p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.birthDate && formData.weight && formData.height;
      case 2:
        return formData.trainingLocation;
      case 3:
        return formData.goal;
      case 4:
        return formData.wakeUpTime && formData.sleepTime;
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Passo {step} de {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-cyan-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700"
          >
            {step === totalSteps ? 'Ver Preview' : 'Próximo'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}