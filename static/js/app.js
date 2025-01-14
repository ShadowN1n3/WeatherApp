// Funktion zum Abrufen der Wetterdaten und Aktualisieren der Seite
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Daten: ' + response.statusText);
        }

        const data = await response.json();
        data.get
        console.log(data)

        const dataElement = document.getElementById('data');

        if (dataElement) {
            dataElement.innerText = data.temperatur

        } else {
            console.error("Element mit ID 'data' nicht gefunden.");
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);

        const dataElement = document.getElementById('data');
        if (dataElement) {
            dataElement.innerText = "Fehler beim Abrufen der Daten.";
        }
    }
}

window.onload = fetchData;
setInterval(fetchData, 60000);
