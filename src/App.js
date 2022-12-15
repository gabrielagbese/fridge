import React, { useState } from "react"
import MealList from "./MealList"
import { useEffect } from "react";
import "./layout.css"
import gsap from "gsap"


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
			ul.appendChild(li);
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
	let recipeList = document.querySelector(".result")

	function showRecipeList(){
		if(window.innerWidth < 720){
			tl.to(recipeList,{yPercent: -100,duration: 2})
		}
	}

	function hideRecipeList(){
		if(window.innerWidth < 720){
			tl.to(recipeList,{yPercent: 100,duration: 2})
		}
	}

	function getMealData() {
		console.log("passed string: " + stringResult)
		fetch(
			'https://api.spoonacular.com/recipes/findByIngredients?apiKey=33ea468d6ee248d59f00052842c3332b&ingredients=' + stringResult
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


	return (
		<div className="app">
			<section className="controls">
				<div className="input-section">
					<div className="input-section-top">
						<input
							type="string"
							className="ing-input"
							placeholder="ingredients"
							onChange={handleChange}
						/>
						<button className="add-button" onClick={handleInput}>+</button>
					</div>
					<button className="get-button" onClick={getMealData}>Get Recipe</button>
				</div>
				<ul className="ingredient-track"></ul>
			</section>
			<section className="result">
				<p onClick={hideRecipeList}>X</p>
				{mealData && <MealList mealData={mealData} />}
			</section>
		</div>
	);
}

export default App;
