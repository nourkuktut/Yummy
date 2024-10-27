let rowDataMeal = $(".row-data-meal");
let categorie = $(".Categories");
let Area = $(".Area");
let Ingredients = $(".Ingredients");
let meal = $(".meal");

function openSideNav() {
  const sideNav = $(".side-nav");
  const barIcon = $(".bar-icon");
  sideNav.animate({ left: 0 }, 400);
  barIcon.removeClass("fa-align-justify").addClass("fa-x");
  $(".link li").each(function (index) {
    $(this).animate({ top: 0 }, (index + 5) * 100);
  });
}

function closeSideNav() {
  const sideNav = $(".side-nav");
  const barIcon = $(".bar-icon");
  const boxSizing = $(".side-nav-internal").outerWidth();

  sideNav.animate({ left: -boxSizing }, 400);
  barIcon.addClass("fa-align-justify").removeClass("fa-x");

  $(".link li").animate({ top: 300 }, 500);
}
// Start the sidebar state by closing
closeSideNav();
// Activate the event when clicking on the side menu icon :
$(".bar-icon").on("click", function () {
  if ($(".side-nav").css("left") === "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});

//* search by name:
async function searchByName(term) {
  let respense = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  respense = await respense.json();
  console.log(respense.meals);
  displayMeals(respense.meals);
}
//^ dispaly meals:
function displayMeals(array) {
  let card = "";
  for (let index = 0; index < array.length; index++) {
    card += `
        <div class="col-md-3">
      <div   onclick="getMealDetails('${array[index].idMeal}')"  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
        <img class="w-100" src="${array[index].strMealThumb}" alt="${array[index].strMeal}" />
        <div class="meal-layer position-absolute d-flex align-items-center justify-content-center w-100 h-100">
          <h3 class="text-black">${array[index].strMeal}</h3>
        </div>
      </div>
    </div>
        `;
  }
  rowDataMeal.html(card);
}
searchByName("");

//* get  categories :
async function getcategorie() {
  let respense = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  respense = await respense.json();
  dispalyCategories(respense.categories);
  console.log(respense.categories);
}
//* add event in $categorie  :
categorie.on("click", function () {
  getcategorie();
});

//^ dispaly categories:
function dispalyCategories(array) {
  let card = "";
  for (let index = 0; index < array.length; index++) {
    card += `
        <div class="col-md-3">
      <div onclick="getCatMeal('${
        array[index].strCategory
      }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
        <img class="w-100" src="${array[index].strCategoryThumb}" alt="${
      array[index].strCategory
    }" />
        <div class="meal-layer position-absolute text-center w-100 h-100 text-black">
          <h3 class="text-black">${array[index].strCategory}</h3>
          <p>${array[index].strCategoryDescription
            .split(" ")
            .slice(0, 25)
            .join(" ")}</p>
        </div>
      </div>
    </div>
        `;
  }

  rowDataMeal.html(card);
}

//* get Area :
async function getArea() {
  let respense = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  respense = await respense.json();
  console.log(respense.meals);
  dispalyArea(respense.meals);
}
//* add event in $Area  :
Area.on("click", function () {
  getArea();
});

//^ dispaly Area:
function dispalyArea(array) {
  let card = "";
  for (let index = 0; index < array.length; index++) {
    card += `
        <div class="col-md-3">
      <div onclick="getAreaMeal('${array[index].strArea}')" class="rounded-2 text-center cursor-pointer">
      <i class="fa-solid fa-earth-oceania fa-3x " style="color: #63E6BE;"></i>
          <h3  style=" color: #63E6BE;">${array[index].strArea}</h3>
      </div>
    </div>
        `;
  }
  rowDataMeal.html(card);
}

//! get Ingredients🥣 :
async function getIngredients() {
  let respense = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respense = await respense.json();
  console.log(respense.meals);
  dispalyIngredients(respense.meals.slice(0, 24));
}
//! add event in $Ingredients🥣  :
Ingredients.on("click", function () {
  getIngredients();
});

//! dispaly Ingredients🥣:
function dispalyIngredients(array) {
  let card = "";
  for (let index = 0; index < array.length; index++) {
    card += `
        <div class="col-md-3">
      <div  onclick="getIngredientsMeal('${
        array[index].strIngredient
      }')" class="rounded-2 text-center cursor-pointer">
      <i class="fa-solid fa-bowl-food fa-4x" style="color: #63E6BE;"></i>
      <h3  style=" color: #63E6BE;">${array[index].strIngredient}</h3>
      <p style=" color: #63E6BE;">${array[index].strDescription
        .split(" ")
        .slice(0, 12)
        .join(" ")}</p>
      </div>
    </div>
        `;
  }
  rowDataMeal.html(card);
}

//! get categoriesMeal:
async function getCatMeal(category) {
  let respense = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  respense = await respense.json();
  displayMeals(respense.meals.slice(0, 20));
  // console.log(respense);
}

//&& get AreaMeal:
async function getAreaMeal(area) {
  let respense = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  respense = await respense.json();
  displayMeals(respense.meals.slice(0, 25));
  // console.log(respense);
}

//&& get IngredientsMeal:
async function getIngredientsMeal(Ingredient) {
  let respense = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`
  );
  respense = await respense.json();
  displayMeals(respense.meals.slice(0, 25));
  // console.log(respense);
}

//&& get MealDetails:
async function getMealDetails(foodId) {
  let respense = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`
  );
  respense = await respense.json();
  console.log(respense.meals[0]);
  // console.log(foodId);
  displayMealDetails(respense.meals[0]);
}

//&& displayMealDetails:
function displayMealDetails(meal) {
  let Ingredient = ``;
  for (let index = 1; index <= 20; index++) {
    if (meal[`strIngredient${index}`]) {
      Ingredient += `<li class="alert alert-success">${
        meal[`strMeasure${index}`]
      } ${meal[`strIngredient${index}`]}</li>`;
    }
  }

  let strTags = "";
  if (meal.strTags) {
    let Tags = meal.strTags.split(",");
    for (let index = 0; index < Tags.length; index++) {
      strTags += `<li class="alert alert-secondary">${Tags[index]}</li>`;
    }
  } else {
    strTags = `<li class="alert alert-secondary">No tags available</li>`;
  }

  let card = `
  <div class="col-md-4">
          <img
            class="img-fluid w-100 rounded-3"
            src="${meal.strMealThumb}"
            alt="${meal.strMeal}"
          />
          <h2>${meal.strMeal}</h2>
        </div>
        <div class="col-md-8">
          <h2>Instructions</h2>
          <p>${meal.strInstructions}</p>
          <h3 class="fw-light"><span class="fw-bold">Area: </span>${meal.strArea}</h3>
          <h3 class="fw-light"><span class="fw-bold">Category: </span>${meal.strCategory}</h3>
          <h3>Recipes :</h3>
          <ul class="list-unstyled object-fit-contain d-flex m-3 gap-2 text-center flex-wrap p-2">
            ${Ingredient}
          </ul>
          <h3>Tags :</h3>
          <ul class="list-unstyled object-fit-contain d-flex m-3 gap-2 text-center flex-wrap">
            ${strTags}
          </ul>

          <div class="d-flex gap-2 me-2">
            <button class="btn btn-info">
              <a class="text-decoration-none text-white" href="${meal.strSource}">Source</a>
            </button>
            <button class="btn btn-danger">
              <a class="text-decoration-none text-white" href="${meal.strYoutube}">YouTube</a>
            </button>
          </div>
        </div>
  `;
  rowDataMeal.html(card);
}
