import React from 'react'
import { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard';
import gsap from 'gsap';

export default function Meal({ meal }) {

	var mealinfo = null;
	const [recipeData, setRecipeData] = useState(null);
	const [prepTime, setPrepTime] = useState(null);
	const [servingsNo, setServingsNo] = useState(null);

	function getDetails(id) {
		fetch(
			// 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=d711325cee4d4d2b969afb272193fcb5&ingredients='+ingredients
			'https://api.spoonacular.com/recipes/' + id + '/information?apiKey=09c24c93b2974a7b86a966713897fa24&includeNutrition=false'
		)
			.then((response) => response.json())
			.then((data) => {
				setRecipeData(data.instructions);
				console.log(data.instructions)
				setPrepTime(data.readyInMinutes)
				setServingsNo(data.servings)
			})
			.catch(() => {
				console.log("error")
			})
	}

	function seeRecipe(){
		let tl2 = gsap.timeline();
		let recipeWrapper = document.querySelector(".recipe-wrapper")
		getDetails(meal.id);
		tl2.fromTo(recipeWrapper,{xPercent: 0, opacity: 0,duration: 1},{xPercent: -100, opacity: 1,duration: 1})
	}

	function recipeExit(){
		let tl2 = gsap.timeline();
		let recipeWrapper = document.querySelector(".recipe-wrapper")
		getDetails(meal.id);
		tl2.to(recipeWrapper,{xPercent: -100, opacity: 0,duration: 1})
	}

	return (
		<section className='meal-list-wrapper'>
			<article className='meal-list'>
				<h1>{meal.title}</h1>
				<img src={meal.image} alt="recipe" />
				<ul>
					<li>No of available ingredients used: {meal.usedIngredientCount}</li>
					<li>No of missing ingredients: {meal.missedIngredientCount}</li>
					{/* <li>Ingredients used: {meal.usedIngredients.name}</li> */}
				</ul>

				{/* <a onClick={() => {getDetails(meal.id)}}>See Details</a>
        		<div> {mealinfo}</div> */}
				<button onClick={() => { seeRecipe() }}>See Recipe</button>
				
			</article>
			<div className='recipe-wrapper' onClick={() => {recipeExit()}}>
				{recipeData && <RecipeCard recipeData={recipeData} prepTime={prepTime} servingsNo={servingsNo} />}
			</div>
		</section>
	)
}
