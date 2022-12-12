# FWD-Image-Processing

This is a full stack application , created using React-Client Side & Express/Node-Server Side .

# Run and use server code (Backend)

1- Download and unzip the project directory.

2- use your terminal to `cd server` and then `npm run install` ,this will install the required packges to run this project.

3- run `npm start` or `npm run start:prod` , to run project in development or production on PORT:5000 .

run `npm run test` , to build the project and start unit testing with jasmine

run `npm run format` , to format code.

run `npm run lint` , to Find problems in code

## API Endpoints

| HTTP Verbs | Endpoints             | Action                                                                         |
| ---------- | --------------------- | ------------------------------------------------------------------------------ |
| GET        | /api/images/all       | To retrive list of file in Full directory as an Array                          |
| GET        | /api/images/:filename | To retrive single image by file name                                           |
| GET        | /api/images?          | To retrive a resized image by passing query parameters (filename,width,height) |
| POST       | /api/upload           | To Upload jpg image to Full directory                                          |

#Now Let Run Client Code (Frontend)

## Keep the server running and open new terminal

1- `cd client` and then `npm run install` ,to install the required packges to run client code.
2- run `npm start` , and visit to http://localhost:3000

### Technologies Used

- [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
- [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
- [ReactJs](https://reactjs.org/) A JavaScript library for building user interfaces
- [axios](https://axios-http.com/docs/intro/) Axios is a promise-based HTTP Client for node.js and the browser. It is isomorphic (= it can run in the browser and nodejs with the same codebase).
