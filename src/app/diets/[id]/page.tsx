'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';

interface Diet {
  id: string;
  name: string;
  description: string;
  goal: string;
}

interface DietFood {
  id: string;
  quantity_grams: number;
  meal: string;
  day_of_week: string;
  foods: {
    id: string;
    name: string;
    calories_per_100g: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export default function DietDetailPage() {
  const [diet, setDiet] = useState<Diet | null>(null);
  const [dietFoods, setDietFoods] = useState<DietFood[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const params = useParams();
  const dietId = params.id as string;

  useEffect(() => {
    fetchDietDetails();
    checkSubscription();
  }, [dietId]);

  const checkSubscription = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('user_details')
        .select('is_subscribed')
        .eq('user_id', user.id)
        .single();
      setIsSubscribed(data?.is_subscribed || false);
    }
  };

  const fetchDietDetails = async () => {
    try {
      // Buscar dieta
      const { data: dietData, error: dietError } = await supabase
        .from('diets')
        .select('*')
        .eq('id', dietId)
        .single();

      if (dietError) throw dietError;
      setDiet(dietData);

      // Buscar alimentos da dieta
      const { data: foodsData, error: foodsError } = await supabase
        .from('diet_foods')
        .select(`
          id,
          quantity_grams,
          meal,
          day_of_week,
          foods (
            id,
            name,
            calories_per_100g,
            protein,
            carbs,
            fat
          )
        `)
        .eq('diet_id', dietId);

      if (foodsError) throw foodsError;
      setDietFoods(foodsData || []);
    } catch (error) {
      console.error('Erro ao buscar detalhes da dieta:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Carregando dieta...</p>
        </div>
      </div>
    );
  }

  if (!diet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Dieta não encontrada.</p>
        </div>
      </div>
    );
  }

  // Agrupar alimentos por refeição
  const meals = dietFoods.reduce((acc, food) => {
    if (!acc[food.meal]) {
      acc[food.meal] = [];
    }
    acc[food.meal].push(food);
    return acc;
  }, {} as Record<string, DietFood[]>);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">{diet.name}</h1>
          <p className="text-gray-600 mb-4">{diet.description}</p>
          <span className="text-sm text-gray-500 capitalize">
            Objetivo: {diet.goal.replace('_', ' ')}
          </span>
        </div>

        {!isSubscribed && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
            <p>Esta é uma prévia da dieta. Assine o VidaFitPro para acessar a dieta completa e personalizada!</p>
          </div>
        )}

        <div className="space-y-6">
          {Object.entries(meals).map(([mealName, foods]) => (
            <div key={mealName} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">{mealName}</h2>
              <div className="space-y-2">
                {foods.map((food) => {
                  const quantity = food.quantity_grams;
                  const calories = (food.foods.calories_per_100g * quantity) / 100;
                  const protein = (food.foods.protein * quantity) / 100;
                  const carbs = (food.foods.carbs * quantity) / 100;
                  const fat = (food.foods.fat * quantity) / 100;

                  return (
                    <div key={food.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <span className="font-medium">{food.foods.name}</span>
                        <span className="text-gray-500 ml-2">({quantity}g)</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {Math.round(calories)} cal | P: {Math.round(protein)}g | C: {Math.round(carbs)}g | G: {Math.round(fat)}g
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {!isSubscribed && (
          <div className="mt-8 text-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 text-lg font-semibold">
              Assinar VidaFitPro - Acesso Completo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}