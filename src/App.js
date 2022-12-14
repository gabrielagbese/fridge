import React, {useState} from "react"
import MealList from "./MealList"
import { useEffect } from "react";
import "./layout.css"

function App() {
  const [mealData, setMealData] = useState(null);
  const [ingredients, setIngredients] = useState("chicken,curry");
  var [ingredientList, listChange] = useState(["chicken","beef","rice","beans"])
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
      li.addEventListener('click', function() {
        let filteredArray = ingredientList.filter(ingredients => ingredients !== item);
        listChange(filteredArray);
        console.log(item+" clicked")
        console.log(ingredientList);
      })

      li.innerHTML += item;
      numbs +=1
      //console.log(numbs)
    });
    stringResult = String(ingredientList)
    console.log(stringResult);

    
    //
  },);

  
  

  function handleChange(e){
    setIngredients(e.target.value);
    
  }

  function handleInput(e){
    //list.push(ingredients);
    listChange([...ingredientList,ingredients]);
    
    document.querySelector(".ingInput").value = ""
    document.querySelector(".ingInput").focus();
    
  }

  function getMealData(){
    console.log("passed string: "+stringResult)
    fetch(
      'https://api.spoonacular.com/recipes/findByIngredients?apiKey=33ea468d6ee248d59f00052842c3332b&ingredients='+stringResult
    )
    .then((response)=> response.json())
    .then((data) => {
      setMealData(data);
      console.log(data)
    })
    .catch(()=>{
      console.log("error")
    })
  }


  return (
    <div className="App">
      <ul className="ingredient-track"></ul>
      <section className="controls">
        <input 
          type="string"
          className="ingInput"
          placeholder="ingredients"
          onChange={handleChange}
        />
        <button onClick={handleInput}>+</button>
        <button onClick={getMealData}>Get Recipe</button>
        {mealData && <MealList mealData={mealData} />}
      </section>
    </div>
  );
}

export default App;
