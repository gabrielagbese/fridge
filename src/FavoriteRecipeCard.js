import React from 'react'
import { useState, useEffect } from 'react';

export default function FavoriteRecipeCard({recipeData,prepTime,servingsNo,targetClass, open, hideRecipe, recipeId, title, ingredients, diets,vegetarian,vegan,dairyFree,glutenFree,keto}) {

    const [ingredientss, setIngredientss] = useState([]);

    

    if(!open) return null
            

   
    return (
        <main className='favorite-recipe-card'>
            <button onClick={hideRecipe}>X</button>
           <section className={"visible rcs" + targetClass} >
           <p className='recipe-card-title'>{title}</p>
           <div className='recipe-card-header'>
                    <h3>{prepTime} minutes</h3>
                    <h3>serves: {servingsNo}</h3>
                    <h3>Diet:</h3>
                    <ul className='diet-ul'>
                        {vegetarian && <li>Vegetarian</li>}
                        {vegan && <li>Vegan</li>}
                        {dairyFree && <li>Dairy Free</li>}
                        {keto && <li>Ketogenic</li>}
                        {glutenFree && <li>Gluten Free</li>}
                    </ul>
                </div>
                <div className='ingredients-instructions'>
                    <ul id='myUL ingredients'>
                        <h3>Ingredients</h3>
                        {ingredients.map((ingredient) =>
                            <li key={ingredient.id} className='ingredients-ul'>{ingredient.original}</li>
                        )}
                    </ul>
                    <div className='instructions'>
                        <h3>Instructions</h3>
                        <p dangerouslySetInnerHTML={{__html: recipeData}} className='instructions-list'></p>
                    </div>
                    
                </div>
           </section>
       </main>
    )
}
