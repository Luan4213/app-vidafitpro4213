'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { PostgrestError } from '@supabase/supabase-js'

type FoodRow = {
  id: number
  name?: string
  calories_per_100g?: number
  // adicione aqui outras propriedades que você usa
}

type MealFood = {
  food_id: number
  quantity: number
}

type Meal = {
  id: number | string
  nome: string
  Alimentos: MealFood[]
}

export default function CreateDietPage() {
  const supabase = createClientComponentClient()

  const handleCreateDiet = async () => {
    try {
      // Buscar alimentos (até 50)
      const { data: alimentos, error } = await supabase
        .from<FoodRow>('Alimentos')
        .select('*')
        .limit(50)

      if (error) {
        console.error('Erro ao buscar alimentos:', error)
        alert('Erro ao buscar alimentos')
        return
      }

      // Caso não haja alimentos
      if (!alimentos || alimentos.length === 0) {
        alert('Nenhum alimento encontrado')
        return
      }

      // Gerar refeições (sua função)
      const refeicoes = generateMeals(2000, 'perder', alimentos)

      // Preparar todos os inserts em lote por refeição
      // Vamos agrupar todos os registros de diet_foods e inserir em uma chamada
      const inserts: Array<Record<string, any>> = []

      for (const refeicao of refeicoes) {
        // se não existir Alimentos nessa refeição, pula
        if (!Array.isArray(refeicao.Alimentos) || refeicao.Alimentos.length === 0) continue

        for (const alimento of refeicao.Alimentos) {
          inserts.push({
            diet_id: refeicao.id,
            food_id: alimento.food_id,
            quantity_grams: alimento.quantity,
            meal: refeicao.nome,
            day_of_week: 'Segunda-feira',
          })
        }
      }

      if (inserts.length === 0) {
        alert('Nenhuma refeição gerada para salvar')
        return
      }

      // Inserir em lote
      const { data: insertData, error: insertError } = await supabase
        .from('diet_foods')
        .insert(inserts)

      if (insertError) {
        console.error('Erro ao inserir diet_foods:', insertError)
        alert('Erro ao salvar dieta')
        return
      }

      alert('Dieta criada com sucesso!')
    } catch (err) {
      const e = err as Error | PostgrestError
      console.error('Erro inesperado ao criar dieta:', e)
      alert('Erro ao criar dieta')
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Criar Dieta</h1>

      <button
        onClick={handleCreateDiet}
        style={{
          padding: '12px 20px',
          background: 'black',
          color: 'white',
          borderRadius: 8,
          marginTop: 20,
        }}
      >
        Gerar Dieta
      </button>
    </main>
  )
}

// Função fake — substitua pela sua implementação real de geração
function generateMeals(calorias: number, objetivo: string, alimentos: FoodRow[]): Meal[] {
  return [
    {
      id: 1,
      nome: 'Café da manhã',
      Alimentos: alimentos.slice(0, 3).map((a) => ({
        food_id: a.id,
        quantity: 100,
      })),
    },
  ]
}
