'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Diet {
  id: string;
  name: string;
  description: string;
  goal: string;
  created_at: string;
}

export default function DietsPage() {
  const [diets, setDiets] = useState<Diet[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    fetchUserDiets();
    checkSubscription();
  }, []);

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

  const fetchUserDiets = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_diets')
        .select(`
          diet_id,
          diets (
            id,
            name,
            description,
            goal,
            created_at
          )
        `)
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) throw error;

      const userDiets = data.map(item => item.diets).filter(Boolean);
      setDiets(userDiets);
    } catch (error) {
      console.error('Erro ao buscar dietas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Carregando suas dietas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Minhas Dietas</h1>
          <Link
            href="/diets/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Criar Nova Dieta
          </Link>
        </div>

        {!isSubscribed && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
            <p className="mb-2">Assine o VidaFitPro para acessar dietas 100% personalizadas!</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Assinar Agora
            </button>
          </div>
        )}

        {!isSubscribed && diets.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Preview: Dieta Exemplo</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Café da Manhã</h3>
                <p className="text-sm text-gray-600">Aveia (50g), Banana (1 unidade), Whey protein (20g)</p>
              </div>
              <div>
                <h3 className="font-medium">Almoço</h3>
                <p className="text-sm text-gray-600">Frango grelhado (150g), Arroz cozido (100g), Brócolis (100g)</p>
              </div>
              <div>
                <h3 className="font-medium">Jantar</h3>
                <p className="text-sm text-gray-600">Peixe salmão (150g), Batata doce (200g), Espinafre (100g)</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">* Esta é uma prévia. Sua dieta personalizada será calculada com base nos seus dados.</p>
          </div>
        )}

        {diets.length === 0 && isSubscribed && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Você ainda não tem dietas ativas.</p>
            <Link
              href="/diets/create"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            >
              Criar Minha Primeira Dieta
            </Link>
          </div>
        )}

        {diets.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {diets.map((diet) => (
              <div key={diet.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-2">{diet.name}</h2>
                <p className="text-gray-600 mb-4">{diet.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 capitalize">
                    Objetivo: {diet.goal.replace('_', ' ')}
                  </span>
                  <Link
                    href={`/diets/${diet.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}