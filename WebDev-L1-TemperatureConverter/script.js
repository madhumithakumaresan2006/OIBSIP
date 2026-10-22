
const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const convertBtn = document.getElementById("convertBtn");
const error = document.getElementById("error");

const celsiusOutput = document.getElementById("celsius");
const fahrenheitOutput = document.getElementById("fahrenheit");
const kelvinOutput = document.getElementById("kelvin");

convertBtn.addEventListener("click", function () {
    const rawValue = temperatureInput.value.trim();
    const temperature = Number(rawValue);
    const unit = unitSelect.value;

    error.textContent = "";
    celsiusOutput.textContent = "--";
    fahrenheitOutput.textContent = "--";
    kelvinOutput.textContent = "--";

    // Validate empty and invalid input
    if (rawValue === "" || !Number.isFinite(temperature)) {
        error.textContent = "Please enter a valid temperature.";
        return;
    }

    let celsius;

    // Convert the input to Celsius first
    if (unit === "celsius") {
        celsius = temperature;
    } else if (unit === "fahrenheit") {
        celsius = (temperature - 32) * 5 / 9;
    } else {
        celsius = temperature - 273.15;
    }

    // Absolute zero validation
    if (celsius < -273.15 - 1e-10) {
        error.textContent =
            "Temperature cannot be below absolute zero (-273.15 °C).";
        return;
    }

    // Avoid tiny floating-point errors at absolute zero
    celsius = Math.max(celsius, -273.15);

    // Calculate all output units
    const fahrenheit = (celsius * 9 / 5) + 32;
    const kelvin = celsius + 273.15;

    // Display formatted results
    celsiusOutput.textContent = celsius.toFixed(2) + " °C";
    fahrenheitOutput.textContent = fahrenheit.toFixed(2) + " °F";
    kelvinOutput.textContent = kelvin.toFixed(2) + " K";
});

// Clear the error when the user changes the input
temperatureInput.addEventListener("input", function () {
    error.textContent = "";
});

unitSelect.addEventListener("change", function () {
    error.textContent = "";
});
