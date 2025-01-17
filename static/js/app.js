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
            dataElement.textContent = removeSpacesAndLineBreaks(data + "°")
        })
        .catch(error => {
            console.error("Fehler beim Abrufen der Daten:", error);
            dataElement.textContent = "Fehler beim Abrufen der Daten.";
        });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    setInterval(fetchData, 60000);
});

const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});

function removeSpacesAndLineBreaks(input) {
  return input.replace(/[\s\n\r]+/g, '');
}
