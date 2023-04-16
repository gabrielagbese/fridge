import React from 'react'

export default function RecipeCard({recipeData,prepTime,servingsNo,targetClass, open, hideRecipe, cuisine}) {

    if(!open) return null


         
    return (
        <main className='recipe-card'>
            <button onClick={hideRecipe}>X</button>
           <section className={"visible rcs" + targetClass} >
                <h3>{prepTime} minutes</h3>
                <h3>Cuisine: {cuisine}</h3>
                <h3>serves: {servingsNo}</h3>
                <h3 dangerouslySetInnerHTML={{__html: recipeData}}></h3>
           </section>
       </main>
    )
}
