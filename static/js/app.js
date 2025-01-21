let currentPage = "weather"

document.addEventListener("DOMContentLoaded", () => {
    loadContent('weather', fetchWeatherData);
    setInterval(fetchWeatherData, 60000);
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const page = event.target.getAttribute('data-page');
        currentPage = page;
        if (page === "weather") {
            loadContent(page, fetchWeatherData);
        } else if (page === "calendar") {

        } else if (page === "api_data") {
            loadContent(page, fetchApiData);
        }
    });
});

function fetchWeatherData() {
    if (currentPage === "weather") {
        const dataElement = document.getElementById("data");

    fetch("/api/data")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-Error: ${response.status}`);
            }
            return response.text();
        })
        .then(dataString => {
            const data = JSON.parse(dataString);
            data.temperature = parseFloat(data.temperature).toFixed(1);
            if (Array.isArray(data)) {
                let {temperature, icon} = data[0];

                dataElement.textContent = `${temperature}° - Spenge`;

                changeImage(`${icon}`);
            } else {
                throw new Error("Unerwartetes Datenformat");
            }
        })
        .catch(error => {
            console.error("Fehler beim Abrufen der Daten:", error);
            dataElement.textContent = "Fehler beim Abrufen der Daten.";
        });
    }
}


const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        card.scrollIntoView({behavior: 'smooth', block: 'center'});
    });
});


function changeImage(icon) {

    const currentImage = document.getElementById("weather-image");
    try {
        if (icon === "partly-cloudy-night") {
            currentImage.src = '/static/images/partly-cloudy-night.png';
        } else if (icon === "partly-cloudy-day") {
            currentImage.src = '/static/images/partly-cloudy-night.png';
        } else if (icon === "cloudy") {
            currentImage.src = '/static/images/partly-cloudy-night.png';
            //currentImage.src = '/static/images/cloudy.png';
        }
    } catch (e) {
        console.error(e, "image not found");
    }

}

function loadContent(page, callback) {
    const container = document.getElementById('content-container');
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
            console.error(error);
            container.innerHTML = `<p>Fehler: Inhalt konnte nicht geladen werden.</p>`;
        });
}

function fetchApiData() {
    const apiDataElement = document.querySelector('.api-data');

    if (!apiDataElement) {
        console.error("Das Element mit der Klasse 'api-data' wurde nicht gefunden.");
        return;
    }

    fetch('/api/data') // URL deiner API
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-Error: ${response.status}`);
            }
            return response.json(); // JSON-Daten parsen
        })
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                const firstElement = data[0]; // Nur das erste Element der JSON
                apiDataElement.textContent = JSON.stringify(firstElement, null, 2); // Als rohe JSON in das div schreiben
            } else {
                apiDataElement.textContent = "Keine Daten verfügbar oder unerwartetes Format.";
            }
        })
        .catch(error => {
            console.error("Fehler beim Abrufen der API-Daten:", error);
            apiDataElement.textContent = "Fehler beim Abrufen der Daten.";
        });
}