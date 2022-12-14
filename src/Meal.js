import React from 'react'
import {useState,useEffect} from 'react'
import RecipeCard from './RecipeCard';

export default function Meal({ meal }) {

    var mealinfo = null; 
    const [recipeData, setRecipeData] = useState(null);
    const [prepTime, setPrepTime] = useState(null);
    const [servingsNo, setServingsNo] = useState(null);

    function getDetails(id){
        fetch(
            // 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=d711325cee4d4d2b969afb272193fcb5&ingredients='+ingredients
            'https://api.spoonacular.com/recipes/'+id+'/information?apiKey=09c24c93b2974a7b86a966713897fa24&includeNutrition=false'
          )
          .then((response)=> response.json())
          .then((data) => {
            setRecipeData(data.instructions);
            console.log(data.instructions)
            setPrepTime(data.readyInMinutes)
            setServingsNo(data.servings)
          })
          .catch(()=>{
            console.log("error")
          })
    }

    return (
   <article>
        <h1>{meal.title}</h1>
        <img src={meal.image} alt="recipe" />
        <ul>
            <li>No of available ingredients used: {meal.usedIngredientCount}</li>
            <li>No of missing ingredients: {meal.missedIngredientCount}</li>
            {/* <li>Ingredients used: {meal.usedIngredients.name}</li> */}
        </ul>

        {/* <a onClick={() => {getDetails(meal.id)}}>See Details</a>
        <div> {mealinfo}</div> */}
        <button onClick={() => {getDetails(meal.id)}}>See Recipe</button>
        {recipeData && <RecipeCard recipeData={recipeData} prepTime={prepTime} servingsNo={servingsNo} />}
   </article>
  )
}
