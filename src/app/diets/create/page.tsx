'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function CreateDietPage() {
  const supabase = createClientComponentClient()

  const handleCreateDiet = async () => {
    try {
      // Buscar alimentos
      const { data: alimentos } = await supabase
        .from('Alimentos')
        .select('*')
        .limit(50)

      // Caso não haja alimentos
      if (!alimentos) return

      // Gerar refeições
      const refeicoes = generateMeals(2000, 'perder', alimentos)

      // Salvar cada refeição no banco
      for (let r = 0; r < refeicoes.length; r++) {
        const refeicao = refeicoes[r]

        for (let a = 0; a < refeicao.Alimentos.length; a++) {
          const alimento = refeicao.Alimentos[a]

          await supabase.from('diet_foods').insert({
            diet_id: refeicao.id,
            food_id: alimento.food_id,
            quantity_grams: alimento.quantity,
            meal: refeicao.nome,
            day_of_week: 'Segunda-feira',
          })
        }
      }

      alert('Dieta criada com sucesso!')
    } catch (error) {
      console.error(error)
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

// Função fake — substitua pela sua
function generateMeals(calorias: number, objetivo: string, alimentos: any[]) {
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
