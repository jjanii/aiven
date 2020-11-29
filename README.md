## General Information

## API

The API for frontend is automatically generated based by the `./backend/swagger.yaml` file. It helps us to be on track with correct types all the time.
Once an endpoint is created/modified/deleted, just make the same changes to `swagger.yaml` and on root folder (`./aiven`) run

```shell
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
    -i /local/backend/swagger.yaml \
    -g typescript-fetch \
    -o /local/frontend/src/api/ \
    --additional-properties=typescriptThreePlus=true
```

## Testing

We have some jest unit tests and also cypress tests. (Note: run these in `./frontend`)

To run cypress tests run

```shell
npm run cypress
```

or to open the cypress window and see what the tests actually do, run

```shell
npm run cypress:open
```

Basic jest tests can be ran with

```shell
npm run test
```

## Running the app

### Backend

1. Head to backend directory by

```shell
$ cd backend
```

2. Setup virtual env

```shell
$ ./scripts/setup
```

3. Run the application

```shell
$ ./scripts/run_app
```

The backend will now run on http://localhost:5000

### Frontend

1. Head to frontend directory by

```shell
$ cd frontend
```

2. Install npm packages

```shell
$ npm install
```

3. Run the application

```shell
$ npm start
```

4. The application will run in http://localhost:3000
