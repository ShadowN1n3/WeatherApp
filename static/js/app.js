let currentPage = "weather";
let intervalId = null;

document.addEventListener("DOMContentLoaded", () => {
    switchPage("weather");
});

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        const page = event.target.getAttribute("data-page");

        closeToolbar();
        switchPage(page);
    });
});

function closeToolbar() {
    const toggleCheckbox = document.getElementById("toggle");

    if (!toggleCheckbox) {
        console.error("Checkbox-Element wurde nicht gefunden.");
        return;
    }
    toggleCheckbox.checked = true;
}

function switchPage(page) {
    currentPage = page;
    clearInterval(intervalId);

    if (page === "weather") {
        loadContent(page, fetchWeatherData);
        intervalId = setInterval(fetchWeatherData, 10 * 60 * 1000);
    } else if (page === "calendar") {
        loadContent(page);
    } else if (page === "3") {
        loadContent(page);
    } else if (page === "api_data") {
        loadContent(page, fetchApiData);
        intervalId = setInterval(fetchApiData, 10 * 60 * 1000);
    }
}

function fetchWeatherData() {
    if (currentPage !== "weather") return;

    const dataElement = document.getElementById("data");

    fetch("/api/data")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                const { temperature, icon } = data[0];
                dataElement.textContent = `${parseFloat(temperature).toFixed(1)}° - Spenge`;
                changeImage(icon);
            } else {
                throw new Error("Unerwartetes Datenformat");
            }
        })
        .catch(error => {
            console.error("Fehler beim Abrufen der Daten:", error);
            dataElement.textContent = "Fehler beim Abrufen der Daten.";
        });
}

function fetchApiData() {
    const apiDataElement = document.querySelector(".api-data");

    if (!apiDataElement) {
        console.error("Das Element mit der Klasse 'api-data' wurde nicht gefunden.");
        return;
    }

    fetch("/api/data")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                apiDataElement.textContent = JSON.stringify(data[0], null, 2);
            } else {
                apiDataElement.textContent = "Keine Daten verfügbar oder unerwartetes Format.";
            }
        })
        .catch(error => {
            console.error("Fehler beim Abrufen der API-Daten:", error);
            apiDataElement.textContent = "Fehler beim Abrufen der Daten.";
        });
}

function changeImage(icon) {
    const currentImage = document.getElementById("weather-image");
    const iconMap = {
        "partly-cloudy-night": "/static/images/partly-cloudy-night.png",
        "partly-cloudy-day": "/static/images/partly-cloudy-day.png",
        "cloudy": "/static/images/cloudy.png",
        "rain": "/static/images/rain.png"
    };

    if (iconMap[icon]) {
        currentImage.src = iconMap[icon];
    } else {
        console.error("Unbekanntes Icon:", icon);
    }
}

function loadContent(page, callback = null) {
    const container = document.getElementById("content-container");
    const filePath = `/static/html/${page}_content.html`;

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Fehler beim Laden der Seite: ${filePath}`);
            }
            return response.text();
        })
        .then(data => {
            container.innerHTML = data;
            if (callback) callback();
        })
        .catch(error => {
            console.error("Fehler beim Laden des Inhalts:", error);
            container.innerHTML = `<p>Fehler: Inhalt konnte nicht geladen werden.</p>`;
        });
}