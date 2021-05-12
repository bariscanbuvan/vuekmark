# Social Bookmarking App

This is a social bookmarking web application where people can manage their bookmarks collaboratively.

Built using MEVN (MongoDB, Express.js, Vue.js, Node.js) stack and containerized with Docker.

#### The application lets people:
- Register and login,
- Create and join new dashboards and manage existing ones,
- Search bookmarks
- Create new categories for dashboards and manage existing ones,
- Add links and categorize them

## [Live Demo](https://vuekmark.herokuapp.com/)

# Getting Started

## Setup
For certain reasons, you may want to edit .env files both in client and server folders. 
Corresponding .env files have:
```
./server/.env

SERVER_PORT=8000
MONGO_CONNECTION=mongodb://bookmark-db:27017/vuekmark
ELASTICSEARCH_CONNECTION=http://bookmark-elastic:9200
JWT_SECRET=secret
SCRAPER_SERVICE_URL=http://scraper-service:5000/

-----------------------------------------------------------------------

./client/.env

VUE_APP_PORT=8001
VUE_APP_BACKEND=http://localhost:8000/
VUE_APP_ENVIRONMENT=DEV
```

One should be aware that deleting any of these environment variables may lead to crashes.

### With Docker
1. Install [Docker](https://www.docker.com/) 
2. In the root folder, run docker-compose up command in your terminal
3. By default, you should be able to see your server running on http://localhost:8000/ and client on http://localhost:8001/ and also scraper service on http://localhost:5000/

### Without Docker
##### Server
```
cd server
npm install
npm start
```

##### Client

```
cd client
npm install
npm run serve
```

## Deploy on Heroku

Note that docker.compose.prod.yml does not have database image in it, so one should remember providing ```MONGO_CONNECTION``` (see [MongoDB](https://www.mongodb.com/), [mLab](https://mlab.com/) for database solutions) and ```ELASTICSEARCH_CONNECTION``` (see [Elasticsearch](https://www.elastic.co/), [Bonsai](https://bonsai.io/) for Elasticsearch solutions)

1. Install [Docker](https://www.docker.com/) 
2. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) 
3. Change environment variables in client accordingly
```
./server/.env

SERVER_PORT=8000
MONGO_CONNECTION=YOUR_PRODUCTION_MONGO_CONNECTION
ELASTICSEARCH_CONNECTION=YOUR_PRODUCTION_ELASTICSEARCH_CONNECTION
JWT_SECRET=secret
SCRAPER_SERVICE_URL=YOUR_PRODUCTION_SCRAPER_SERVICE_URL

-----------------------------------------------------------------------

./client/.env

VUE_APP_ENVIRONMENT=PROD
```
4. Build Vue application
```
cd client 
npm run build
```
5. Create an image for production using ```docker-compose -f docker-compose.prod.yml build``` command
6. List all images using ```docker image ls``` command and find your image id
7. Run ```heroku container:login in the terminal```
8. Run ```docker tag <image-id> registry.heroku.com/<app-name>/web``` command
9. Run ```docker push registry.heroku.com/<app-name>/web``` (may take some time)
10. Run ```heroku container:release --app=<app-name> web```

# Tests
## Running Tests
```cd ./server``` and then run ```npm test``` command. Make sure you have correct environment variables in ```.env``` file inside of your ```server``` folder.
## Results

 ```PASS  __tests__/integration/category.js 
  /categories
    POST /
      √ should create a new category and return 201 (9 ms)
      √ should fail on invalid data and return 400 (6 ms)
    GET /:id
      √ should return a category (13 ms) 
      √ should return 404 if category does not exist (6 ms)
    DELETE /:id
      √ should delete category (5 ms)
      √ should return 400 on corrupted object id (5 ms)
    PUT /:id
      √ should update category (13 ms)
      √ should return 400 on invalid data (7 ms)

 PASS  __tests__/integration/user.js
  /users
    POST /register
      √ should register a new user (116 ms)
      √ should not register a user with same username more than once (13 ms)
    POST /login
      √ should return token on successful login (73 ms)

 PASS  __tests__/integration/dashboard.js
  /dashboards
    POST /
      √ should create a new dashboard and return 201 (12 ms)
      √ should fail on invalid data and return 400 (6 ms)
      √ should join dashboard (85 ms)
      √ should return 404 if dashboard to be joined does not exist (5 ms)
      √ should quit from dashboard (12 ms)
      √ should return 404 if dashboard to be quit does not exist (4 ms)
    GET /:id
      √ should return a dashboard (12 ms)
      √ should return 404 if dashboard does not exists (4 ms)
      √ should return bookmarks of dashboard (979 ms)
      √ should return categories of dashboard (16 ms)
    DELETE /:id
      √ should delete dashboard (6 ms)
      √ should return 400 on corrupted object id (5 ms)
    PUT /:id
      √ should update dashboard (12 ms)
      √ should return 400 on invalid data (9 ms)

 PASS  __tests__/integration/bookmark.js (7.477 s)
  /bookmarks
    POST /
      √ should create a new bookmark and return 201 (1006 ms)
      √ should fail on invalid data and return 400 (13 ms)
    GET /:id
      √ should return a bookmark (659 ms)
      √ should return 404 if bookmark does not exists (4 ms)
    GET /search/:text
      √ should return bookmarks accordingly search term (1215 ms)
      √ should return empty array if search does not have any results (18 ms)
    DELETE /:id
      √ should delete bookmark (10 ms)
      √ should return 400 on corrupted object id (4 ms)
    PUT /:id
      √ should update bookmark (655 ms)
      √ should return 400 on invalid data (652 ms)
```

# Further Improvements
- Tests (it only has integration tests, and not so elegant - violating DRY)
- Input validation both on backend and frontend
- Better use of .env variables and docker-compose