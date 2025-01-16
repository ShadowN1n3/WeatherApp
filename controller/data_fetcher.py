import datetime
import requests
import time

class DataFetcher:
    def __init__(self):
        self.api_url = "https://api.brightsky.dev/weather"
        self.cords_spenge = ["52.144642", "8.482570"]
        self.data_cache = {}


    def fetch_data(self, currentDate, locationLat, locationLng, url):
        try:
            querystring = {"date": currentDate, "lat": str(locationLat), "lon": str(locationLng)}
            response = requests.get(url, params=querystring)
            if response.status_code == 200:
                data = response.json()
                if 'weather' in data and len(data['weather']) > 0:
                    self.data_cache = data['weather'][0]['temperature']
                    print("Daten erfolgreich abgerufen und im Cache gespeichert.")
                else:
                    print("Keine Wetterdaten verfügbar.")
            else:
                print(f"Fehler: API antwortete mit Status {response.status_code}")
        except Exception as e:
            print(f"Fehler beim Abrufen der Daten: {e}")

    def get_data(self):
        if not self.data_cache:
            return {"error": "Data not ready, please try again later"}
        return self.data_cache

    def fetch_data_periodically(self, interval=600):
        while True:
            self.fetch_data(datetime.datetime.now(), self.cords_spenge[0], self.cords_spenge[1], self.api_url)
            time.sleep(interval)
