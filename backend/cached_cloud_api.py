import http.client
import time
import logging

CACHE_TIME_IN_SECONDS = 60

data = []
latest_data_insert = time.time()


def get_cached_clouds():
    # Caches succesful data to local variable, if next request occurs before
    # 60 seconds have passed, return the cached data instead

    # In production environment we could use redis
    global data, latest_data_insert

    if (not data or time.time() - latest_data_insert > CACHE_TIME_IN_SECONDS):
        res = _get_clouds()
        if res.status == 200:
            data = res.read()
            latest_data_insert = time.time()

        else:
            # We could also notify sentry here
            logging.error('Call to api.aiven.io/v1/clouds failed')
        return data

    return data


def _get_clouds():
    conn = http.client.HTTPSConnection("api.aiven.io")

    conn.request("GET", "/v1/clouds")
    return conn.getresponse()
