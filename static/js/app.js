
document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    setInterval(fetchData, 60000);
});

function fetchData() {
    const dataElement = document.getElementById("data");

    fetch("/api/data")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-Error: ${response.status}`);
            }
            return response.text();
        })
        .then(dataString  => {
            const data = JSON.parse(dataString);
            if (Array.isArray(data)) {
                let { temperature, icon } = data[0];

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

const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});

function changeImage(icon) {

    const currentImage = document.getElementById("weather-image");
    if (icon === "partly-cloudy-night") {
        currentImage.src = '/static/images/partly-cloudy-night.png';
    } else if (icon === "partly-cloudy-day") {
        currentImage.src = '/static/images/partly-cloudy-night.png';
    }
}
