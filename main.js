var studyBtn = document.querySelector(".study-button");
var meditateBtn = document.querySelector(".meditate-button");
var exerciseBtn = document.querySelector(".exercise-button");
var startActivityBtn = document.querySelector(".start-activity-button");
var studyImg = document.querySelector(".study-img");
var studyImgActive = document.querySelector(".study-img-active");
var meditateImg = document.querySelector(".meditate-img");
var meditateImgActive = document.querySelector(".meditate-img-active");
var exerciseImg = document.querySelector(".exercise-img");
var exerciseImgActive = document.querySelector(".exercise-img-active");
var activityInput = document.querySelector(".accomplish-input");
var minutesInput = document.getElementById("minutes-input");
var secondsInput = document.getElementById("seconds-input");
var categoryError = document.querySelector(".category-error");
var activityError = document.querySelector(".description-error");
var minutesError = document.querySelector(".minutes-error");
var secondsError = document.querySelector(".seconds-error");
var currentActivityView = document.querySelector(".current-activity");
var newActivityView = document.querySelector(".new-activity");
var startTimerBtn = document.querySelector(".start-timer-button");
var descriptionDisplay = document.querySelector(".current-description");
var timerDisplay = document.querySelector(".timer");
var logActivityBtn = document.querySelector(".log-activity-button");
var createActivtyBtn = document.querySelector(".create-new-button");
var cardContainer = document.querySelector(".cards-container");
var completedActivityView = document.querySelector(".completed-activity-view");
var categoryColorBar = '';
var currentActivity = {};
var activityCategory = undefined;

document.addEventListener("load", displayActivity());
studyBtn.addEventListener("click", activateStudy);
meditateBtn.addEventListener("click", activateMeditate);
exerciseBtn.addEventListener("click", activateExercise);
startActivityBtn.addEventListener("click", startActivity);
startTimerBtn.addEventListener("click", start);
logActivityBtn.addEventListener("click", saveCard);
createActivtyBtn.addEventListener("click", goHome);
minutesInput.addEventListener("input", preventCharacters);
secondsInput.addEventListener("input", preventCharacters);

function preventCharacters() {
  this.value.replace(/[e\+\-]/gi, '')
}

function disableStart() {
  startTimerBtn.disabled = true;
}

function resetStart() {
  startTimerBtn.disabled = false;
}

function goHome() {
  startTimerBtn.innerText = "START";
  showHide(newActivityView, completedActivityView);
  clearInputValues();
  resetStart();
  hide(logActivityBtn);
}

function clearInputValues() {
  activityInput.value = '';
  minutesInput.value = '';
  secondsInput.value = '';
  activityCategory = undefined;
  removeColor();
}

function saveCard() {
  currentActivity.saveToStorage();
  displayActivity();
  showHide(completedActivityView, currentActivityView);
  currentActivity = {};
}

function displayActivity() {
  var savedActivities = parseData();
  if (savedActivities) {
    cardContainer.innerHTML = '';
    for (var i = 0; i < savedActivities.length; i++) {
      cardContainer.innerHTML +=
      `<section class="card">
        <section class="card-text">
          <p class="card-header">${savedActivities[i].category}</p>
          <p class="card-time">
          ${savedActivities[i].minutes} MIN
          ${savedActivities[i].seconds} SECONDS
          </p>
          <p class="card-description">
          ${savedActivities[i].description}
          </p>
        </section>
        <section class="category-color-bar ${savedActivities[i].color}">
        </section>
      </section>`
    }
  }
}

function stringifyData(savedActivities) {
  localStorage.setItem('savedActivities', JSON.stringify(savedActivities));
}

function parseData() {
  return JSON.parse(localStorage.getItem('savedActivities'));
}

function updateDescription() {
  descriptionDisplay.innerText = activityInput.value;
}

function updateTimer() {
  currentActivity.minutes = currentActivity.minutes.toString().padStart(2, '0');
  currentActivity.seconds = currentActivity.seconds.toString().padStart(2, '0');
  timerDisplay.innerText = `${currentActivity.minutes}:${currentActivity.seconds}`;
}

function start() {
  currentActivity.countdown(currentActivity.minutes, currentActivity.seconds);
  disableStart();
}

function show(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}

function showHide(view, vanish) {
  show(view);
  hide(vanish);
}

function startActivity() {
  startTimerBtn.disabled = false;
  throwError();
  if (activityCategory && activityInput.value
    && minutesInput.value && secondsInput.value ) {
    createActivity();
    showHide(currentActivityView, newActivityView);
    updateDescription();
    updateTimer();
  }
}

function createActivity() {
  currentActivity = {};
  currentActivity = new Activity
  (activityCategory, categoryColorBar,
    activityInput.value, minutesInput.value, secondsInput.value);
}

function assignCategory(category) {
  activityCategory = category;
}

function assignCategoryColor(category) {
  categoryColorBar = category;
}

function addErrorStyling(input) {
  input.classList.add("error");
}

function removeErrorStyling(input) {
  input.classList.remove("error");
}

function throwError() {
  if (!activityInput.value) {
    addErrorStyling(activityInput);
    show(activityError);
  } if (!minutesInput.value) {
    addErrorStyling(minutesInput);
    show(minutesError);
  } if (!secondsInput.value) {
    addErrorStyling(secondsInput);
    show(secondsError);
  } if (!activityCategory) {
    show(categoryError);
  }
  removeError();
}

function removeError() {
  if (activityInput.value) {
    removeErrorStyling(activityInput);
    hide(activityError);
  } if (minutesInput.value) {
    removeErrorStyling(minutesInput);
    hide(minutesError);
  } if (secondsInput.value) {
    removeErrorStyling(secondsInput);
    hide(secondsError);
  } if (activityCategory) {
    hide(categoryError);
  }
}

function removeColor() {
  showHide(studyImg, studyImgActive);
  showHide(meditateImg, meditateImgActive);
  showHide(exerciseImg, exerciseImgActive);
  removeClass(studyBtn, "study-button-color");
  removeClass(meditateBtn, "meditate-button-color");
  removeClass(exerciseBtn, "exercise-button-color");
  clearColor();
}

function addClass(variableName, className) {
  variableName.classList.add(className);
  startTimerBtn.classList.add(className);
}

function clearColor() {
  startTimerBtn.classList.remove("study-button-color");
  startTimerBtn.classList.remove("meditate-button-color");
  startTimerBtn.classList.remove("exercise-button-color");
}

function removeClass(variableName, className) {
  variableName.classList.remove(className);
}

function activateStudy() {
  removeColor();
  assignCategoryColor("study");
  addClass(studyBtn, "study-button-color");
  showHide(studyImgActive, studyImg);
  assignCategory("Study");
}

function activateMeditate() {
  removeColor();
  assignCategoryColor("meditate");
  addClass(meditateBtn, "meditate-button-color");
  showHide(meditateImgActive, meditateImg);
  assignCategory("Meditate");
}

function activateExercise() {
  removeColor();
  assignCategoryColor("exercise");
  addClass(exerciseBtn, "exercise-button-color");
  showHide(exerciseImgActive, exerciseImg);
  assignCategory("Exercise");
}
