import React from 'react'
import FavoriteMeal from './FavoriteMeal'

export default function FavoriteMealList({mealData}) {
    //const meal = mealData;


  return (
     <main>
        <section className='meals'>
            {mealData.map((meal) => {
                return <FavoriteMeal 
                    key={meal.id}
                    meal={meal}
                />
            })}
        </section>
    </main>
  )
}
