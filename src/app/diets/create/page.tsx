      // Buscar alimentos adequados
      const { data: foods } = await supabase
        .from('foods')
        .select('*')
        .limit(50);

      // Gerar refeições
      const meals = generateMeals(macros.calories, formData.goal!, foods || []);

      // Para cada refeição, adicionar alimentos
      for (let i = 0; i < meals.length; i++) {
        const meal = meals[i];
        for (let j = 0; j < meal.foods.length; j++) {
          const food = meal.foods[j];
          await supabase.from('diet_foods').insert({
            diet_id: diet.id,
            food_id: food.food_id,
            quantity_grams: food.quantity,
            meal: meal.name,
            day_of_week: 'Segunda-feira'
          });
        }
      }