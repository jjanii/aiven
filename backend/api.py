from flask import Flask
from flask_cors import CORS, cross_origin

from cached_cloud_api import get_cached_clouds

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/clouds')
@cross_origin()
def get_cloud_platforms():
    data = get_cached_clouds()
    return data
