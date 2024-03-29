import React from 'react'
import { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard';
import gsap from 'gsap';
import { doc, getDoc, updateDoc, collection } from "firebase/firestore";
import { auth, db } from "./config/firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

export default function Meal({ meal }) {

	var mealinfo = null;
	const [data, setData] = useState(null);
	const [recipeData, setRecipeData] = useState(null);
	const [title, setTitle] = useState(null);
	const [prepTime, setPrepTime] = useState(null);
	const [servingsNo, setServingsNo] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [cuisine, setCuisine] = useState(null);
	const [recipeId, setRecipeId] = useState(null);
	const [ingredients, setIngredients] = useState([]);
	const [diets, setDiets] = useState(null);
	const [vegetarian, setVegetarian] = useState(null);
	const [vegan, setVegan] = useState(null);
	const [dairyFree, setDairyFree] = useState(null);
	const [keto, setKeto] = useState(null);
	const [glutenFree, setGlutenFree] = useState(null);

	const result = document.querySelector(".result");

	
	async function getDetails(id) {
		fetch(
			'https://api.spoonacular.com/recipes/' + id + '/information?apiKey=1bddb21db90a4dcea2cd71ce8f2d1188&includeNutrition=true'
		)
			.then((response) => response.json())
			.then((data) => {
				setData(data)
				console.log(data)
				setTitle(data.title)
				setRecipeData(data.instructions);
				setPrepTime(data.readyInMinutes)
				setRecipeId(data.id)
				setDiets(data.diets)
				setServingsNo(data.servings)
				setCuisine(data.cuisine)
				setDiets(data.diets)
				setVegetarian(data.vegetarian)
				setVegan(data.vegan)
				setDairyFree(data.dairyFree)
				setGlutenFree(data.glutenFree)
				setKeto(data.ketogenic)
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

	const addToFavorites = async (id) => {
		// Get the current user's ID
		const uid = auth.currentUser.uid;

		// Get the user's document reference
		const userRef = doc(db, "users", uid);

		// Get the user's data from Firestore
		const docSnap = await getDoc(userRef);

		// Check if the document exists
		if (docSnap.exists()) {
			// Get the current list of favorites
			const favorites = docSnap.data().favouriteId || [];

			// Check if the meal is already in favorites
			if (favorites.includes(id)) {
				// Remove the meal from favorites
				const index = favorites.indexOf(id);
				favorites.splice(index, 1);
			} else {
				// Add the meal to favorites
				favorites.unshift(id);
			}

			// Update the user's document in Firestore
			await updateDoc(userRef, {
				favouriteId: favorites,
			});
		} else {
			console.log("User document not found");
		}
	};
	

	return (
		<section className='meal-list-wrapper'>
			<article className='meal-list'>
				<div className='m-inline'>
					<h1 className='m-title'>{meal.title}</h1>
					<ul className='m-ul'>
						{meal.usedIngredientCount && <li>Matching ingredients: {meal.usedIngredientCount}</li>}
						{meal.usedIngredientCount && <li>{Math.round((meal.usedIngredientCount/meal.missedIngredientCount)*100)}% Match</li>}
						<div className='m-buttons'>
							<button className='m-details' onClick={() => { seeRecipe() }}>See Recipe</button>
							<button className='m-save' onClick={() => {addToFavorites(meal.id)}}><FontAwesomeIcon icon={faBookmark} /></button>
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
						title={title}
						prepTime={prepTime} 
						servingsNo={servingsNo} 
						open={isOpen}
						cuisine={cuisine}
						recipeId={recipeId}
						ingredients={ingredients}
						diets={diets}
						vegetarian={vegetarian}
						vegan={vegan}
						glutenFree={glutenFree}
						dairyFree={dairyFree}
						keto={keto}
						hideRecipe={() => {setIsOpen(false)}}
						/>
				</div>
			</article>

		</section>
	)
}
