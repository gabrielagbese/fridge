import React from 'react'
import { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard';
import gsap from 'gsap';

export default function Meal({ meal }) {

	var mealinfo = null;
	const [data, setData] = useState(null);
	const [recipeData, setRecipeData] = useState(null);
	const [prepTime, setPrepTime] = useState(null);
	const [servingsNo, setServingsNo] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [cuisine, setCuisine] = useState(null);
	const [recipeId, setRecipeId] = useState(null);
	const [ingredients, setIngredients] = useState([]);
	const [diets, setDiets] = useState(null);

	const result = document.querySelector(".result");

	async function getDetails(id) {
		fetch(
			'https://api.spoonacular.com/recipes/' + id + '/information?apiKey=1bddb21db90a4dcea2cd71ce8f2d1188&includeNutrition=true'
		)
			.then((response) => response.json())
			.then((data) => {
				setData(data)
				console.log(data)
				setRecipeData(data.instructions);
				setPrepTime(data.readyInMinutes)
				setRecipeId(data.id)
				setDiets(data.diets)
				setServingsNo(data.servings)
				setCuisine(data.cuisine)
				setDiets(data.diets)
				setIngredients(data.extendedIngredients)
			})
			.catch(() => {
				console.log("error")
			})

			
		
	}

	function seeRecipe() {
		getDetails(meal.id);
		setIsOpen(true);
	}

	

	return (
		<section className='meal-list-wrapper'>
			<article className='meal-list'>
				<div className='m-inline'>
					<h1 className='m-title'>{meal.title}</h1>
					<ul className='m-ul'>
						<li>Matching ingredients: {meal.usedIngredientCount}</li>
						{/* <li>Total ingredients: {meal.missedIngredientCount}</li> */}
						<li>{Math.round((meal.usedIngredientCount/meal.missedIngredientCount)*100)}% Match</li>
						{/* <li>Ingredients used: {meal.usedIngredients.name}</li> */}
						<div className='m-buttons'>
							<button className='m-details' onClick={() => { seeRecipe() }}>See Recipe</button>
							<button className='m-save'>h</button>
						</div>
				</ul>
				</div>
				<img className='m-img' src={meal.image} alt="recipe" />
				

				{/* <a onClick={() => {getDetails(meal.id)}}>See Details</a>
        		<div> {mealinfo}</div> */}
				
				<div className='recipe-wrapper'>
					<p></p>
					<RecipeCard 
						className={meal.title.replaceAll(/[^a-zA-Z0-9]/g, '-')} 
						targetClass={meal.title.replaceAll(/[^a-zA-Z0-9]/g, '-')} 
						recipeData={recipeData} 
						prepTime={prepTime} 
						servingsNo={servingsNo} 
						open={isOpen}
						cuisine={cuisine}
						recipeId={recipeId}
						ingredients={ingredients}
						diets={diets}
						hideRecipe={() => {setIsOpen(false)}}
						/>
				</div>
			</article>

		</section>
	)
}
