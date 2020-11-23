import http.client
from flask import Flask, jsonify
from flask_caching import Cache
from flask_swagger import swagger

cache = Cache(config={'CACHE_TYPE': 'simple'})
app = Flask(__name__)

cache.init_app(app)


@app.route('/clouds')
@cache.cached(timeout=60)
def get_cloud_platforms():
    conn = http.client.HTTPSConnection("api.aiven.io")

    conn.request("GET", "/v1/clouds")

    res = conn.getresponse()
    data = res.read()

    return data


@app.route("/spec")
def spec():
    return jsonify(swagger(app))
