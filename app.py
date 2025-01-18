import threading
from flask import Flask, render_template, jsonify, send_from_directory
from controller.data_fetcher import DataFetcher

app = Flask(__name__)

data_fetcher = DataFetcher()


@app.route('/api/data')
def get_data():
    return jsonify(data_fetcher.get_data())

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/favicon.ico')
def favicon():
    return send_from_directory('static', 'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
    threading.Thread(target=data_fetcher.fetch_data_periodically, daemon=True).start()
    app.run(host='0.0.0.0', port=5000)
