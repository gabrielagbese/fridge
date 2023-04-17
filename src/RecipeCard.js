import React from 'react'
import { useState, useEffect } from 'react';

export default function RecipeCard({recipeData,prepTime,servingsNo,targetClass, open, hideRecipe, recipeId, ingredients, diets}) {

    const [ingredientss, setIngredientss] = useState([]);

    // useEffect(() => {
    //     for (let index = 0; index < diets.length; index++) {
    //         console.log(diets[index])
    //         var ul = document.getElementById("diet-ul");
    //         var li = document.createElement("li");
    //         li.appendChild(document.createTextNode(diets[index]));
    //         ul.appendChild(li);
    //     }
    // }, []);

    if(!open) return null
            

   
    return (
        <main className='recipe-card'>
            <button onClick={hideRecipe}>X</button>
           <section className={"visible rcs" + targetClass} >
                <h3>{prepTime} minutes</h3>
                <h3>serves: {servingsNo}</h3>
                <h3>Diets</h3>
                <ul id='diet-ul'>
                    {/* {diets.map((diet, i) =>
                        <li key={i} className='ingredients'>{diet}</li>
                    )} */}
                </ul>
                <ul id='myUL'>
                    <h3>Ingredients</h3>
                    {ingredients.map((ingredient) =>
                        <li key={ingredient.id} className='ingredients'>{ingredient.original}</li>
                    )}
                </ul>
                <h3 dangerouslySetInnerHTML={{__html: recipeData}}></h3>
           </section>
       </main>
    )
}
