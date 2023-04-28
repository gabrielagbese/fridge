import React, { useRef, useState } from "react"
import MealList from "./MealList"
import FavoriteMealList from "./FavoriteMealList";
import { useEffect } from "react";
import "./layout.css"
import gsap from "gsap"


import { Auth } from "./components/Auth";
import { db } from "./config/firebase"
import { getDocs, collection, addDoc, doc, setDoc, query, where, getDoc } from "firebase/firestore"
import { auth, googleProvider } from "./config/firebase"
import { signInWithPopup, signOut, getAdditionalUserInfo } from "firebase/auth"

import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faPlus,faBowlFood } from '@fortawesome/free-solid-svg-icons'


function App() {
	const [favoriteList, setFavoriteList] = useState([])
	const [mealData, setMealData] = useState(null);
	const [ingredients, setIngredients] = useState("");
	var [ingredientList, listChange] = useState([])
	const [favoriteSectionDataState, setFavoriteSectionDataState] = useState(null)

	const signInGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider).then(async (result) => {
				const aUI = getAdditionalUserInfo(result)
				const isNew = aUI.isNewUser
				console.log(isNew)
				if (isNew) {
					// Create Firestore document for new user with empty favouriteId array
					const userRef = doc(db, "users", result.user.uid);
					const userData = {
						favouriteId: [],
						name: result.user.displayName
					};
					await setDoc(userRef, userData);
				} else {
					// Check Firestore for existing user document and log its data
					const userDocRef = doc(db, "users", result.user.uid);
					const userDocSnap = await getDoc(userDocRef);
					if (userDocSnap.exists()) {
						const userData = userDocSnap.data();
						setFavoriteList(userData.favouriteId)
						console.log(userData);
					} else {
						console.log("No user document found for this UID.");
					}
				}
			})
		} catch (err) {
			console.log(err)
		}
	}


	const logout = async () => {
		try {
			await signOut(auth)
		} catch (err) {
			console.log(err)
		}
	}


	let stringResult;
	const userCollectionRef = collection(db, "users")



	console.log("fl:")
	console.log(favoriteList)
	// const favoriteClick = async () => {
	// 	await addDoc(userCollectionRef, {recipeId: []})
	// }



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
	},);

	function handleChange(e) {
		setIngredients(e.target.value);

	}

	function handleInput(e) {
		//list.push(ingredients);
		listChange([...ingredientList, ingredients]);

		document.querySelector(".ing-input").value = ""
		document.querySelector(".ing-input").focus();	

	}

	let tl = gsap.timeline()
	let tl2 = gsap.timeline()
	let recipeList = document.querySelector(".result")
	let favorite = document.querySelector(".favorite-section")
	const favSec = useRef()

	let mm = gsap.matchMedia();

	function showFavorite() {
		if (window.innerWidth < 720) {
			tl2.to(favSec.current, { yPercent: -206, duration: 1 })
		}
		if (window.innerWidth >= 720) {
			tl2.to(favSec.current, { xPercent: -100, duration: 1 })
		}
	}

	function hideFavorite() {
		if (window.innerWidth < 720) {
			tl2.to(favSec.current, { yPercent: 206, duration: 1 })
		}
		if (window.innerWidth >= 720) {
			tl2.to(favSec.current, { xPercent: 100, duration: 1 })
		}
	}



	function showRecipeList() {
		if (window.innerWidth < 720) {
			tl.to(recipeList, { yPercent: -100, duration: 1 })
		}
	}

	function hideRecipeList() {
		if (window.innerWidth < 720) {
			tl.to(recipeList, { yPercent: 100, duration: 1 })
		}
	}

	function getMealData() {
		console.log("passed string: " + stringResult)
		fetch('https://api.spoonacular.com/recipes/findByIngredients?apiKey=1bddb21db90a4dcea2cd71ce8f2d1188&ingredients=' + stringResult)
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

	function getFavoriteData() {
		getFavoriteRecipes()
		showFavorite()
		favoritesClick()
		console.log("fsd:");
		console.log(auth?.currentUser? "auth yes":"auth no");
	}

	const getFavoriteRecipes = async () => {
		const favoriteIds = favoriteList.join(",");
		const response = await fetch(`https://api.spoonacular.com/recipes/informationBulk?apiKey=1bddb21db90a4dcea2cd71ce8f2d1188&ids=${favoriteIds}`);
		const favoriteSectionData = await response.json();
		setFavoriteSectionDataState(favoriteSectionData)
		console.log(favoriteSectionData);
		// Do something with the retrieved data
	  }

	const favoritesClick = async () => {
		if (auth.currentUser) {
		  const uid = auth.currentUser.uid;
		  const userRef = doc(collection(db, "users"), uid);
	
		  try {
			const docSnap = await getDoc(userRef);
			if (docSnap.exists()) {
			  const favorites = docSnap.data().favouriteId;
			  console.log(favorites);
			  setFavoriteList(favorites);
			}
		  } catch (error) {
			console.log("Error getting document:", error);
		  }
		}
	};


	return (
		<div className="app">
			<section className="controls">
				<div className="controls-top">
					<div className="top-name">
						<p className="hello-name">Hello&nbsp;</p>
						<p className="hello-name">{auth?.currentUser?.displayName.split(' ')[0]},</p>
					</div>
					<div className="log-buttons">
						{auth?.currentUser? <button className="log-out" onClick={logout}>Log Out&nbsp;&nbsp;&nbsp; <FontAwesomeIcon icon={faRightFromBracket} /></button> :<button className="log-in" onClick={signInGoogle}>Sign in with Google </button>}
						
						
					</div>

				</div>
				<p className="whats">What's in your fridge?</p>
				<div className="input-section">
					<div className="input-section-top">
						<input
							type="string"
							className="ing-input"
							placeholder="Enter Ingredient"
							onChange={handleChange}
						/>
						<button className="add-button" onClick={handleInput}><FontAwesomeIcon icon={faPlus} /></button>
					</div>
					<button className="get-button" onClick={getMealData}>Get Recipe</button>
				</div>
				<ul className="ingredient-track"></ul>
				<button className="fav-button" onClick={auth?.currentUser? getFavoriteData : signInGoogle}>Favorites</button>
			</section>
			<section className="result">
				{/* <div className="result-top">
					<p className="result-title">Recipes: </p>
					<p className="result-title" onClick={hideRecipeList}><FontAwesomeIcon icon={faX} /></p>
				</div> */}
				{mealData && <p className="result-title" onClick={hideRecipeList}><FontAwesomeIcon icon={faX} /></p>}
				{mealData? <MealList mealData={mealData} />: 
				<div className="empty-home">
					<FontAwesomeIcon icon={faBowlFood} />
					<p>Input your ingredients and click <br/>"Get Recipe" to see the recipes you can make.</p>
				</div>}
			</section>
			<section className="favorite-section" ref={favSec}>
				<p onClick={hideFavorite} >&nbsp;&nbsp;<FontAwesomeIcon icon={faX} /></p>
				<div className="favorite-section-inner">
					
					{/* {favoriteList.map((favorite) => (
						<p> id: {favorite}</p>
					))} */}
					{favoriteSectionDataState && <FavoriteMealList mealData={favoriteSectionDataState} />}
				</div>
			</section>
		</div>
	);
}

export default App;
