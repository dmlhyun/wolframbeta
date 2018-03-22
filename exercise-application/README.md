## local setup
Before you start please run the following:
```
npm i
```
To start the app there are two servers that needs to be booted.
1. Run the following anywhere in root:
```
npm start
```
2. Run the following anywhere in folder /src/server:
```
node server.js
```
The interface should be running on localhost:3000

## database connection
You will need db_config.json for database connection.
Once you have received the file, please drop it in exercise_application folder.
Then run
```
node test_database_connection.js
```
To make sure that the database connection is working
