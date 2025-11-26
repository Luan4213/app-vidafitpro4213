'use client';

import { useState } from 'react';
import { ArrowRight, Dumbbell, Apple, Droplets, Trophy, Zap, Target, Heart, Star, CheckCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="flex flex-col items-center text-center space-y-8 sm:space-y-10">
          {/* Logo */}
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 p-4 rounded-2xl shadow-2xl hover:scale-110 transition-transform duration-300">
              <Dumbbell className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              VidaFitPro
            </h1>
          </div>

          {/* Tagline */}
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Seu Personal Trainer com <span className="text-emerald-600">Inteligência Artificial</span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed">
              Treino personalizado, dieta inteligente e acompanhamento completo por apenas{' '}
              <span className="font-bold text-emerald-600 text-2xl sm:text-3xl">R$ 29,90/mês</span>
            </p>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 border-2 border-white" />
                ))}
              </div>
              <span className="text-gray-700 font-medium">+10.000 usuários ativos</span>
            </div>
            <div className="flex items-center gap-1 bg-white px-6 py-3 rounded-full shadow-lg">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="ml-2 text-gray-700 font-medium">4.9/5.0</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/onboarding" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 text-xl px-12 py-8 hover:scale-105"
              >
                Começar Agora Grátis
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
            <Link href="#demo" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-xl px-12 py-8 hover:scale-105 transition-all duration-300"
              >
                <Play className="mr-2 w-5 h-5" />
                Ver Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 sm:mt-24">
          <FeatureCard
            icon={<Dumbbell className="w-8 h-8" />}
            title="Treinos Personalizados"
            description="Exercícios adaptados ao seu objetivo: casa ou academia com vídeos explicativos"
            gradient="from-emerald-500 to-green-600"
          />
          <FeatureCard
            icon={<Apple className="w-8 h-8" />}
            title="Dieta Inteligente"
            description="Plano alimentar personalizado com IA baseado no seu metabolismo"
            gradient="from-orange-500 to-red-600"
          />
          <FeatureCard
            icon={<Droplets className="w-8 h-8" />}
            title="Hidratação Automática"
            description="Lembretes inteligentes calculados para sua rotina diária"
            gradient="from-cyan-500 to-blue-600"
          />
          <FeatureCard
            icon={<Trophy className="w-8 h-8" />}
            title="Gamificação"
            description="Conquistas, desafios e evolução diária com compartilhamento social"
            gradient="from-purple-500 to-pink-600"
          />
        </div>

        {/* Benefits Section */}
        <div className="mt-24 sm:mt-32 bg-white rounded-3xl shadow-2xl p-8 sm:p-16 border border-gray-100">
          <div className="text-center mb-16">
            <h3 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Por que escolher o VidaFitPro?
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tecnologia de ponta para transformar sua saúde de forma inteligente e sustentável
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BenefitItem
              icon={<Target className="w-6 h-6" />}
              title="Objetivos Claros"
              description="Ganho de massa muscular ou perda de gordura - você escolhe e a IA adapta tudo"
            />
            <BenefitItem
              icon={<Zap className="w-6 h-6" />}
              title="Resultados Rápidos"
              description="Acompanhamento diário com fotos, métricas e análise de progresso em tempo real"
            />
            <BenefitItem
              icon={<Heart className="w-6 h-6" />}
              title="Saúde Completa"
              description="Treino + Nutrição + Hidratação integrados em um único aplicativo"
            />
            <BenefitItem
              icon={<Trophy className="w-6 h-6" />}
              title="Motivação Constante"
              description="Compartilhe conquistas, inspire pessoas e participe de desafios diários"
            />
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-24 sm:mt-32">
          <div className="text-center mb-12">
            <h3 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Vidas Transformadas
            </h3>
            <p className="text-xl text-gray-600">
              Veja o que nossos usuários estão dizendo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Maria Silva"
              result="-12kg em 3 meses"
              text="O VidaFitPro mudou minha vida! Os treinos em casa são perfeitos e a dieta é super fácil de seguir."
              rating={5}
            />
            <TestimonialCard
              name="João Santos"
              result="+8kg de massa muscular"
              text="Melhor investimento que já fiz. Os treinos de academia são incríveis e os resultados aparecem rápido!"
              rating={5}
            />
            <TestimonialCard
              name="Ana Costa"
              result="-15kg em 4 meses"
              text="Adorei a gamificação! Me mantém motivada todos os dias. Recomendo muito!"
              rating={5}
            />
          </div>
        </div>

        {/* Pricing CTA */}
        <div className="mt-24 sm:mt-32 text-center bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-3xl p-10 sm:p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <h3 className="text-4xl sm:text-5xl font-bold mb-6">
              Comece sua transformação hoje!
            </h3>
            <div className="mb-4">
              <p className="text-2xl sm:text-3xl mb-2">
                Apenas <span className="font-bold text-5xl sm:text-6xl">R$ 29,90</span>/mês
              </p>
              <p className="text-lg sm:text-xl opacity-90">
                Menos que um café por dia para transformar sua vida
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-8 text-base sm:text-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Cancele quando quiser</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>7 dias de garantia</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Suporte 24/7</span>
              </div>
            </div>
            <Link href="/onboarding">
              <Button 
                size="lg" 
                className="bg-white text-emerald-600 hover:bg-gray-100 text-xl px-14 py-8 shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105"
              >
                Criar Minha Conta Grátis
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
            <p className="mt-6 text-sm opacity-80">
              Sem compromisso • Acesso imediato • Pix ou Cartão
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  gradient 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  gradient: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
      <div className={`bg-gradient-to-br ${gradient} w-16 h-16 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function BenefitItem({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="flex gap-5 group">
      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div>
        <h5 className="text-xl font-bold text-gray-900 mb-2">{title}</h5>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function TestimonialCard({
  name,
  result,
  text,
  rating
}: {
  name: string;
  result: string;
  text: string;
  rating: number;
}) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 mb-6 leading-relaxed italic">"{text}"</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-gray-900">{name}</p>
          <p className="text-sm text-emerald-600 font-semibold">{result}</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500" />
      </div>
    </div>
  );
}
