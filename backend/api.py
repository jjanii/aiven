import http.client
from flask import Flask, jsonify
from flask_caching import Cache
from flask_cors import CORS, cross_origin

cache = Cache(config={'CACHE_TYPE': 'simple'})
app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

cache.init_app(app)


@app.route('/clouds')
@cross_origin()
@cache.cached(timeout=60)
def get_cloud_platforms():
    conn = http.client.HTTPSConnection("api.aiven.io")

    conn.request("GET", "/v1/clouds")

    res = conn.getresponse()
    if res.status == 200:
        data = res.read()

        return data

    return jsonify({"Failed to fetch"}), 400
