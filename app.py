import time

from flask import Flask, render_template, jsonify
import threading
from controller.data_fetcher import DataFetcher

app = Flask(__name__)

data_fetcher = DataFetcher()

@app.route('/api/data')
def get_data():
    return jsonify(data_fetcher.get_data())



@app.route("/")
def home():
    return render_template("index.html")

if __name__ == '__main__':
    threading.Thread(target=data_fetcher.fetch_data_periodically, daemon=True).start()
    app.run(debug=True)
