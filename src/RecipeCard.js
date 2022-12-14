import React from 'react'

export default function RecipeCard({recipeData,prepTime,servingsNo}) {

    // function extractContent(s) {
    //     var span = document.createElement('div');
    //     span.innerHTML = s;
    //     return span.textContent || span.innerText;
    //   };
    // function extractContentParse(x){
    //     var unfiltered = extractContent(x);
    //     return unfiltered.replaceAll('.', '.\n'); 
    // }
    console.log(recipeData)     
    return (
        <main>
           <section className='recipe'>
                <h3>{prepTime} minutes</h3>
                <h3>serves: {servingsNo}</h3>
                <h3 dangerouslySetInnerHTML={{__html: recipeData}}></h3>
           </section>
       </main>
    )
}
