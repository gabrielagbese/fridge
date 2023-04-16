import React from 'react'
import { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard';
import gsap from 'gsap';

export default function Meal({ meal }) {

	var mealinfo = null;
	const [recipeData, setRecipeData] = useState(null);
	const [prepTime, setPrepTime] = useState(null);
	const [servingsNo, setServingsNo] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [cuisine, setCuisine] = useState(null);
	const [isClosed, setIsClosed] = useState(true);
	const [title, setTitle] = useState(null);

	const result = document.querySelector(".result");

	// function disableScroll() {
	// 	// Get the current page scroll position
	// 	let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	// 	let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
	  
	// 		// if any scroll is attempted,
	// 		// set this to the previous value
	// 		window.onscroll = function() {
	// 			window.scrollTo(scrollLeft, scrollTop);
	// 		};
	// }
	  
	// function enableScroll() {
	// 	window.onscroll = function() {};
	// }


	function getDetails(id) {
		fetch(
			'https://api.spoonacular.com/recipes/' + id + '/information?apiKey=84958847be2244b1b11a3158c0e32ca8&includeNutrition=true'
		)
			.then((response) => response.json())
			.then((data) => {
				setRecipeData(data.instructions);
				console.log(data.instructions)
				console.log(data.cuisine)
				setPrepTime(data.readyInMinutes)
				setServingsNo(data.servings)
				setCuisine(data.cuisine)
				setTitle(data)
			})
			.catch(() => {
				console.log("error")
			})
		console.log("title:" + title)
	}

	function seeRecipe() {
		getDetails(meal.id);
		setIsOpen(true);
		//result.style.overflow = "hidden"; 
		// disableScroll();
	}

	return (
		<section className='meal-list-wrapper'>
			<article className='meal-list'>
				<div className='m-inline'>
					<h1 className='m-title'>{meal.title}</h1>
					<ul className='m-ul'>
						<li>Matching ingredients: {meal.usedIngredientCount}</li>
						{/* <li>Total ingredients: {meal.missedIngredientCount}</li>
						<li>{Math.round((meal.usedIngredientCount/meal.missedIngredientCount)*100)}% Match</li> */}
						{/* <li>Ingredients used: {meal.usedIngredients.name}</li> */}
						<div className='m-buttons'>
							<button onClick={() => { seeRecipe() }}>See Recipe</button>
							<button >h</button>
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
						hideRecipe={() => {setIsOpen(false)}}
						/>
				</div>
			</article>

		</section>
	)
}
