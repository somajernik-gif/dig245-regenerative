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

// [AI-Assisted: GPT-6 | 2026-10-25]
// Intent: Improve the SVG weather artwork to match the Figma design,
// using coordinated colors and controlled random variation.
function drawWeather(sky) {
  weatherScene.innerHTML = "";
  weatherScene.setAttribute(
    "aria-label",
    sky + " weather illustration"
  );

  if (sky === "Sunny") {
    const sunX = randomInt(140, 165);
    const sunY = 65;
    const sunSize = randomInt(28, 34);

    // Repeat a ray around the center of the sun.
    for (let angle = 0; angle < 360; angle += 30) {
      weatherScene.innerHTML += `
        <line
          x1="${sunX}"
          y1="${sunY - sunSize - 8}"
          x2="${sunX}"
          y2="${sunY - sunSize - 22}"
          stroke="#F2CE68"
          stroke-width="4"
          stroke-linecap="round"
          transform="rotate(${angle} ${sunX} ${sunY})">
        </line>
      `;
    }

    weatherScene.innerHTML += `
      <circle
        cx="${sunX}"
        cy="${sunY}"
        r="${sunSize}"
        fill="#F2CE68">
      </circle>
    `;

    drawCloud(randomInt(12, 25), 118, 0.9, "#FFF9EE");
    drawCloud(randomInt(195, 210), 115, 0.85, "#FFF9EE");
    drawCloud(238, randomInt(40, 55), 0.55, "#FFF9EE");

  } else if (sky === "Cloudy") {
    // Layer darker clouds behind lighter clouds.
    drawCloud(randomInt(125, 145), 35, 1.25, "#A6B8BC");
    drawCloud(randomInt(35, 50), 65, 1.35, "#CBD5CF");
    drawCloud(randomInt(100, 115), 95, 1.35, "#FFF9EE");

  } else if (sky === "Rainy") {
    const dropCount = randomInt(10, 16);

    // Space drops across the scene with small random offsets.
    for (let i = 0; i < dropCount; i++) {
      const x = 45 + i * 13 + randomInt(-3, 3);
      const y = randomInt(105, 145);
      const size = randomInt(7, 11);

      weatherScene.innerHTML += `
        <path
          d="M 0 0
             Q -7 9 0 12
             Q 7 9 0 0 Z"
          transform="translate(${x} ${y}) scale(${size / 10})"
          fill="#638EA4">
        </path>
      `;
    }

    drawCloud(randomInt(100, 115), 25, 1.35, "#A6B8BC");
    drawCloud(randomInt(45, 60), 50, 1.5, "#FFF9EE");

  } else if (sky === "Snowy") {
    const snowCount = randomInt(6, 9);

    for (let i = 0; i < snowCount; i++) {
      const x = 45 + i * 25;
      const y = randomInt(115, 155);
      const size = randomInt(5, 8);

      // Three crossing lines create six snowflake arms.
      for (let angle = 0; angle < 180; angle += 60) {
        weatherScene.innerHTML += `
          <line
            x1="${x}"
            y1="${y - size}"
            x2="${x}"
            y2="${y + size}"
            stroke="#638EA4"
            stroke-width="2"
            stroke-linecap="round"
            transform="rotate(${angle} ${x} ${y})">
          </line>
        `;
      }
    }

    drawCloud(randomInt(100, 115), 25, 1.35, "#A6B8BC");
    drawCloud(randomInt(45, 60), 50, 1.5, "#FFF9EE");
  }
}

// [AI-Generated: GPT-6 | 2026-10-25]
// Intent: Create a reusable rounded cloud from overlapping SVG shapes.
function drawCloud(x, y, size, color) {
  weatherScene.innerHTML += `
    <g
      transform="translate(${x} ${y}) scale(${size})"
      fill="${color}">
      <rect x="18" y="24" width="64" height="26" rx="13"></rect>
      <circle cx="20" cy="32" r="18"></circle>
      <circle cx="42" cy="23" r="23"></circle>
      <circle cx="65" cy="27" r="20"></circle>
      <circle cx="82" cy="35" r="15"></circle>
    </g>
  `;
}