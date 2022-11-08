# Getting Started

Application is comprised of a serverless api gateway and a create-react-app layer. 

The following tools are required

- node v14 at least
- npm

## Backend

-   npm install
-   cd ./serverless
-   `sls offline` or `node ./node_modules/serverless/bin/serverless.js offline`

If you want to create a user using the API, here is a sample request:

```
curl --location --request POST 'http://localhost:4000/api/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "John Doe",
    "email": "ceo@industrybit.xyz"
}'
```

## Frontend
Navigate to the client directory.
```
cd client
```
Install the dependencies using npm.
```
npm install
```
Start the application.
```
npm run start
```
