// global
const generateButton = document.querySelector("#generate-button");
const seasonMenu = document.querySelector("#season");
const temperatureOutput = document.querySelector("#temperature");
const skyOutput = document.querySelector("#sky");
const windOutput = document.querySelector("#wind");
const activityOutput = document.querySelector("#activity");
const weatherScene = document.querySelector("#weather-scene");

const springWeather = ["Sunny", "Cloudy", "Rainy"];
const summerWeather = ["Sunny", "Cloudy", "Rainy"];
const fallWeather = ["Sunny", "Cloudy", "Rainy"];
const winterWeather = ["Sunny", "Cloudy", "Snowy"];

const windOptions = ["Calm", "A light breeze", "Windy"];

const sunnyActivities = [
  "Have a picnic in a sunny field.",
  "Find a sunny window and draw what you see.",
  "Go for a walk outside."
];

const cloudyActivities = [
  "Sketch a shape you notice in the clouds.",
  "Write a short poem about the sky.",
  "Draw the outline of a tree near your window."
];

const rainyActivities = [
  "Listen to the rain and write down three sounds.",
  "Draw the raindrops on your window.",
  "Read a few pages of a book indoors."
];

const snowyActivities = [
  "Make a paper snowflake chain.",
  "Watch the snow from indoors and write a haiku.",
  "Go have a snowball fight."
];

// AI assistance: Helped adapt random selection to weather and activities.
function generate() {
  const season = seasonMenu.value;
  let temperature;
  let weatherOptions;

  // Set the possibilities for the selected season.
  if (season === "spring") {
    temperature = randomInt(45, 75);
    weatherOptions = springWeather;
  } else if (season === "summer") {
    temperature = randomInt(75, 95);
    weatherOptions = summerWeather;
  } else if (season === "fall") {
    temperature = randomInt(40, 70);
    weatherOptions = fallWeather;
  } else {
    temperature = randomInt(20, 45);
    weatherOptions = winterWeather;
  }

  // Select the sky condition and wind.
  const sky = weatherOptions[randomInt(0, weatherOptions.length - 1)];
  const wind = windOptions[randomInt(0, windOptions.length - 1)];

  let activityOptions;

  // Choose an activity list that matches the sky.
  if (sky === "Sunny") {
    activityOptions = sunnyActivities;
  } else if (sky === "Cloudy") {
    activityOptions = cloudyActivities;
  } else if (sky === "Rainy") {
    activityOptions = rainyActivities;
  } else {
    activityOptions = snowyActivities;
    temperature = randomInt(20, 32);
  }

  const activity = activityOptions[randomInt(0, activityOptions.length - 1)];

  // Get the season's display name.
  const seasonName = seasonMenu.options[seasonMenu.selectedIndex].text;

  // Display the results.
  temperatureOutput.textContent = temperature + "°F";
  skyOutput.textContent = sky;
  windOutput.textContent = seasonName + " / " + wind;
  activityOutput.textContent = activity;

  // Draw the matching illustration.
  drawWeather(sky);
}

// listeners
window.addEventListener("load", generate);
generateButton.addEventListener("click", generate);

// helpers
function randomInt(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// AI assistance: Helped write the SVG weather illustrations
// using random sizes, positions, and repeated shapes.
function drawWeather(sky) {
  // Clear the previous illustration.
  weatherScene.innerHTML = "";

  // Describe the illustration.
  weatherScene.setAttribute("aria-label", sky + " weather illustration");

  // Match the illustration background to the forecast panel.
  weatherScene.innerHTML +=
    '<rect width="300" height="180" fill="#ddebf0"></rect>';

  if (sky === "Sunny") {
    // Change the sun's size and position.
    const sunSize = randomInt(25, 45);
    const sunX = randomInt(50, 250);

    weatherScene.innerHTML +=
      `<circle
        cx="${sunX}"
        cy="65"
        r="${sunSize}"
        fill="#f2ce68">
      </circle>`;

  } else if (sky === "Cloudy") {
    // Draw overlapping cloud circles.
    const cloudCount = randomInt(5, 10);

    for (let i = 0; i < cloudCount; i++) {
      const x = randomInt(35, 265);
      const y = randomInt(35, 100);
      const size = randomInt(20, 35);

      weatherScene.innerHTML +=
        `<circle
          cx="${x}"
          cy="${y}"
          r="${size}"
          fill="#fff9ee">
        </circle>`;
    }

  } else if (sky === "Rainy") {
    // Draw scattered rain lines.
    const dropCount = randomInt(15, 30);

    for (let i = 0; i < dropCount; i++) {
      const x = randomInt(15, 285);
      const y = randomInt(15, 150);
      const length = randomInt(8, 18);

      weatherScene.innerHTML +=
        `<line
          x1="${x}"
          y1="${y}"
          x2="${x - 4}"
          y2="${y + length}"
          stroke="steelblue"
          stroke-width="2">
        </line>`;
    }

  } else {
    // Draw scattered snow dots.
    const snowCount = randomInt(15, 30);

    for (let i = 0; i < snowCount; i++) {
      const x = randomInt(15, 285);
      const y = randomInt(15, 165);
      const size = randomInt(2, 5);

      weatherScene.innerHTML +=
        `<circle
          cx="${x}"
          cy="${y}"
          r="${size}"
          fill="white">
        </circle>`;
    }
  }
}