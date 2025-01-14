import datetime
import requests

location = "spenge"
locationLat = "52.144642"
locationLon = "8.482570"
currentDate = datetime.datetime.now()

url = "https://api.brightsky.dev/weather"
querystring = {"date": currentDate, "lat": str(locationLat), "lon": str(locationLon)}
headers = {"Accept": "application/json"}
response = requests.get(url, headers=headers, params=querystring)
print(response.json()['weather'][0])

temp = response.json()['weather'][0]['temperature']
print(temp)
