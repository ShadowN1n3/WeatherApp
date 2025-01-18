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

            try {
                data = data.replace(/\\u([\dA-Fa-f]{4})/g, (match, code) =>
                    String.fromCharCode(parseInt(code, 16))
                );
            } catch (e) {
                console.warn("Fehler bei der Escape-Verarbeitung:", e);
            }

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
    console.log(tempAsInt)
    const currentImage = document.getElementById("weather-image");
    if (tempAsInt <= 0) {
        console.log("cold")
        currentImage.src = '/static/images/cold.png';
    } else if (tempAsInt > 0) {
        console.log("warm")
        currentImage.src = '/static/images/warm.png';
    }
}
