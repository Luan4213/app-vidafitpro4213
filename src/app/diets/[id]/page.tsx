"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function DietDetailsPage({ params }: any) {
  const supabase = createClient();

  const [dietFoods, setDietFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDietDetails() {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("diet_foods")
          .select(
            `
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
          `
          )
          .eq("diet_id", params.id);

        if (error) throw error;

        // 🔥 NORMALIZAÇÃO — transforma { foods: {...} } em um objeto plano
        const normalizedFoods = (data || []).map((item: any) => ({
          id: item.id,
          quantity_grams: item.quantity_grams,
          meal: item.meal,
          day_of_week: item.day_of_week,
          ...item.foods, // junta os dados da tabela foods
        }));

        setDietFoods(normalizedFoods);
      } catch (error) {
        console.error("Erro ao buscar detalhes da dieta:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDietDetails();
  }, [params.id]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Detalhes da Dieta</h1>

      {loading && <p>Carregando...</p>}

      {!loading && dietFoods.length === 0 && <p>Nenhum alimento encontrado.</p>}

      {!loading &&
        dietFoods.map((food) => (
          <div
            key={food.id}
            style={{
              background: "#f4f4f4",
              padding: 12,
              borderRadius: 8,
              marginBottom: 8,
            }}
          >
            <strong>{food.name}</strong>
            <br />
            {food.quantity_grams}g — {food.calories_per_100g} kcal / 100g
            <br />
            Proteínas: {food.protein}g — Carbs: {food.carbs}g — Gorduras:{" "}
            {food.fat}g
            <br />
            <em>
              Refeição: {food.meal} — Dia: {food.day_of_week}
            </em>
          </div>
        ))}
    </div>
  );
}
