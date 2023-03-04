window.onload = ()=>{
    loadDate('fish')
    loadDrind()
}
const loadDate = (name)=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then(response=>response.json())
    .then(data=>sliceData(data.meals,allMeals,'food-show-all-btn','food-hide-btn'))
}

const loadDrind= ()=>{
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
    .then(response=>response.json())
    .then(data=>sliceData(data.drinks,AllDrinds,'drind-show-all-btn','drind-hide-btn'))
}

 //All Root functions .....
function sliceData(data,functionName,showbtnId,hidebtnId){
    const showBtn = document.getElementById(showbtnId);
    const hideBtn = document.getElementById(hidebtnId)
    if(data.length>4){
        functionName(data.slice(0,4))
    }else{
        functionName(data)
    }
    showBtn.addEventListener("click",function(){
        functionName(data)
        this.style.display = 'none'
        hideBtn.classList.remove('hidden')
    })
    hideBtn.addEventListener("click",function(){
        functionName(data.slice(0,4));
        this.classList.add('hidden')
        showBtn.style.display = 'block'
    })
}

function AllDrinds(data){
    const cardContainer = document.getElementById('drind-cards-container');
    cardContainer.innerHTML = ''
    data.forEach(drink=>{
        console.log(drink)
        let div = document.createElement("div")
        div.innerHTML += `
        <div class="w-[350px] h-[400px] bg-pink-200 p-3 rounded-md relative">
            <img class="img-top w-full h-[50%]" src="${drink.strDrinkThumb}" alt="card images">
            <div class="text-center mt-4 flex flex-col">
                <h1 class="text-3xl font-semibold">${drink.strDrink.slice(0,19)}</h1>
                <p class="text-lg mt-2">${drink.strInstructions.slice(0,75)}</p>
                <button onclick="cardDetails('${drink.idDrink}')" class="w-[325px] py-2 outline-none text-white bg-sky-300 hover:bg-sky-400 text-lg font-semibold rounded absolute bottom-3">Add To Cart</button>
            </div>
        </div>
        `
        cardContainer.appendChild(div)
    })
}

function allMeals(meals){
    const cardContainer = document.getElementById("food-cards-container");
    cardContainer.innerHTML = ''
    meals.forEach(meal=>{ 
    let div = document.createElement("div")
    div.innerHTML += `
    <div class="w-[350px] h-[400px] bg-pink-200 p-3 rounded-md relative">
        <img class="img-top w-full h-[50%]" src="${meal.strMealThumb}" alt="card images">
        <div class="text-center mt-4 flex flex-col">
            <h1 class="text-3xl font-semibold">${meal.strMeal.slice(0,20)}</h1>
            <p class="text-lg mt-2">${meal.strInstructions.slice(0,75)}</p>
            <button onclick="cardDetails('${meal.idMeal}')" class="w-[325px] py-2 outline-none text-white bg-sky-300 hover:bg-sky-400 text-lg font-semibold rounded absolute bottom-3">Add To Cart</button>
        </div>
    </div>
    `
    cardContainer.appendChild(div)
    })
}

let total = 0
function cardDetails(id){
    total ++
     document.getElementById("total-add-to-card").innerText = total;

   //console.log(id)
}

//All Event Lestener .....
document.getElementById("search-btn").addEventListener('click',()=>{
    const value = document.getElementById("search-inp").value
    loadDate(value)
})

document.getElementById("add-to-cart").addEventListener('click',()=>{
    window.location.href ='card.html'
})