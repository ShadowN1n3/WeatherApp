let temp;

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
        .then(data => {
            data = data.replace(" - ", "° - ")
            dataElement.textContent = data.replaceAll("\"", "");
            temp = data.substring(1, data.lastIndexOf("°"))
            changeImage()
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

function changeImage() {
    let tempAsInt = parseInt(temp);
    const currentImage = document.getElementById("weather-image");
    if (tempAsInt <= 0) {
        currentImage.src = '/static/images/cold.png';
    } else if (tempAsInt > 0) {
        currentImage.src = '/static/images/warm.png';
    }
}
