import React, { useRef, useState } from "react"
import MealList from "./MealList"
import { useEffect } from "react";
import "./layout.css"
import gsap from "gsap"
import { Auth } from "./components/Auth";


function App() {
	const [mealData, setMealData] = useState(null);
	const [ingredients, setIngredients] = useState("chicken,curry");
	var [ingredientList, listChange] = useState([])
	let stringResult;


	useEffect(() => {
		var numbs = 0;
		//const ul = document.createElement('ul');
		const ul = document.querySelector(".ingredient-track");

		ul.innerHTML = ""


		ingredientList.forEach(item => {
			let li = document.createElement('li');
			li.classList.add("tagstyle");
			ul.prepend(li);
			li.addEventListener('click', function () {
				let filteredArray = ingredientList.filter(ingredients => ingredients !== item);
				listChange(filteredArray);
				console.log(item + " clicked")
				console.log(ingredientList);
			})

			li.innerHTML += item;
			numbs += 1
			//console.log(numbs)
		});
		stringResult = String(ingredientList)
		console.log(stringResult);

		//
	},);

	function handleChange(e) {
		setIngredients(e.target.value);

	}

	function handleInput(e) {
		//list.push(ingredients);
		listChange([...ingredientList, ingredients]);

		document.querySelector(".ingInput").value = ""
		document.querySelector(".ingInput").focus();

	}

	let tl = gsap.timeline()
	let tl2 = gsap.timeline()
	let recipeList = document.querySelector(".result")
	let favorite = document.querySelector(".favorite-section")
	const favSec = useRef()

	console.log("result check: "+recipeList)
	console.log("favorite check: "+favSec)

	let mm = gsap.matchMedia();
	
	function showFavorite(){
		if(window.innerWidth < 720){
			tl2.to(favSec.current,{yPercent: -206,duration: 1})
		}
		if(window.innerWidth >= 720){
			tl2.to(favSec.current,{xPercent: -100,duration: 1})
		}
	}

	function hideFavorite(){
		if(window.innerWidth < 720){
			tl2.to(favSec.current,{yPercent: 206,duration: 1})
		}
		if(window.innerWidth >= 720){
			tl2.to(favSec.current,{xPercent: 100,duration: 1})
		}
	}

	function showRecipeList(){
		if(window.innerWidth < 720){
			tl.to(recipeList,{yPercent: -100,duration: 1})
		}
	}

	function hideRecipeList(){
		if(window.innerWidth < 720){
			tl.to(recipeList,{yPercent: 100,duration: 1})
		}
	}

	function getMealData() {
		console.log("passed string: " + stringResult)
		fetch(
			'https://api.spoonacular.com/recipes/findByIngredients?apiKey=1bddb21db90a4dcea2cd71ce8f2d1188&ingredients=' + stringResult
		)
			.then((response) => response.json())
			.then((data) => {
				setMealData(data);
				console.log(data)
			})
			.catch(() => {
				console.log("error")
			})
			
		showRecipeList();
	}

	function getFavoriteData(){
		showFavorite();
	}


	return (
		<div className="app">
			<section className="controls">
				<Auth />
				<p className="whats">What's in your fridge?</p>
				<div className="input-section">
					<div className="input-section-top">
						<input
							type="string"
							className="ing-input"
							placeholder="Enter Ingredients"
							onChange={handleChange}
						/>
						<button className="add-button" onClick={handleInput}>+</button>
					</div>
					<button className="get-button" onClick={getMealData}>Get Recipe</button>
				</div>
				<ul className="ingredient-track"></ul>
				<button className="fav-button" onClick={getFavoriteData}>Favorites</button>
			</section>
			<section className="result">
				<div className="result-top">
					<p className="result-title">Recipes: </p>
					<p className="result-title" onClick={hideRecipeList}>X</p>
				</div>
				{mealData && <MealList mealData={mealData} />}
			</section>
			<section className="favorite-section" ref={favSec}>
				<p onClick={hideFavorite}> x</p>
			</section>
		</div>
	);
}

export default App;
