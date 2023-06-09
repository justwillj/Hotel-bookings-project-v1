# Hotel bookings project v1

Hotel Bookings is a front end application that uses our custom API we have been provided to handle different types of CRUD request and to be able to present the data to the user. All of the provided resource are include down below including the link for the API, how to run the application and API, the data model we followed and how to run eslint and testing.
# Author: Justin Williams

## Description 

This is a frontend application that allows the user to interact with our custom API and make the basic CRUD request using it. The current app allows the user to login in as rather a employee or a manager. Depending on which role the user is, they will have different access to certain parts of the website. If they are a employee, they will have access to the "/reservations" endpoint and will be able to do a GET, POST, PUT , and a DELETE. If they are a manager they will have the same access to "/reservations" as employee, but will also have access to "/room-types". They will also be able to do a GET, PUT, and a POST.

## Login

| If you want to...              | Use this method...  | And this URI...             |
|--------------------------------|---------------------|-----------------------------|
| Login as a manager or employee | POST                | http://localhost:8080/login |

To login to our application we have 2 different user logins that work:

### Manager
email: manager@hotelapi.com
password: password

### Employee
email: employee@hotelapi.com
password: password

## Prerequistes
Node.js version 18.14.0^

## Usage
* Run npm install in root folder to install dependencies.
* Run npm start and navigate to localhost:3000 to view application.

Access to Reservation data model:

| If you want to...        | Use this method...  | And this URI...                          |
|--------------------------|---------------------|------------------------------------------|
| Create a reservation     | POST                | http://localhost:8080/reservations       |
| Read all reservations    | GET                 | http://localhost:8080/reservations       |
| Read a reservation by id | GET                 | http://localhost:8080/reservations/{id}  |
| Update a reservation     | PUT                 | http://localhost:8080/reservations/{id}  |
| Delete a reservation     | DELETE              | http://localhost:8080/reservations/{id}  |
```
{
    "id": number,
    "user": string,
    "guestEmail": sting,
    "roomTypeId": number,
    "checkInDate": string,
    "numberOfNights": number,
}
```
#### Parameters
The Reservation object has the following properties:
* **id**. Long. Number. The unique identifier for a record in the database. The id is auto-generated, so
  you do not need to include it when creating a new reservation.
* **user**. String. The user's email.
* **guestEmail**. String. The guest's email.
* **RoomTypeId**. Long. The id of the room type.
* **checkInDate**. String. The guest's check in date.
* **numberOfNights**. int. The number of nights the guest will be staying.

Access to Room type data model:

| If you want to...        | Use this method...  | And this URI...                       |
|--------------------------|---------------------|---------------------------------------|
| Create a room types      | POST                | http://localhost:8080/room-types      |
| Read all room types      | GET                 | http://localhost:8080/room-types      |
| Read a room types by id  | GET                 | http://localhost:8080/room-types/{id} |
| Update a room types      | PUT                 | http://localhost:8080/room-types/{id} |
```
{
    "id": number,
    "name": string,
    "description": string,
    "rate": number,
    "active": boolean
}
```
#### Parameters
The Room Type object has the following properties:
* **id**. Long. Number. The unique identifier for a record in the database. The id is auto-generated, so
  you do not need to include it when creating a new room type.
* **name**. String. The room name.
* **description**. String. The room type description.
* **rate**. BigDecimal. The cost of the room per night.
* **active**. Boolean. The status of the room: active or inactive.

## Eslint

To run Eslint:
1. Start the application 
2. Inside of the terminal you want to run the command `npm run lint -- --fix` or `npm run lint`
3. You will see if there are any errors or warning that are on the app

## Testing 

To run the testing that have been created for this project:
1. Start the application
2. Inside of the terminal you want to run the command `npm test`
3. This will run all of the test that have been created and display the line coverage of each test

## Hotel Bookings API Link

To be able to have the front end application working properly you must clone down the API we are using.

The link to the gitlab: https://gitlab.com/mtc-cce/mtc-cce-wdev/curriculum/5-front-end-frameworks/templates/hotel-api

## Usage for API
This API will be hosted on localhost:8080 and requires access to a Postgres database on port 5432.

## Running the API
* Navigate to src\main\java\io\catalyte\training for HotelApiApplication.java
* If starting in Intellij right click Application, then click run.
* After this has been done, the application may be run subsequently with the green play symbol in the top right corner. Ensure the dropdown selection is at HotelApiApplication.

## Starting the Application with Postgres
* Ensure that your postgres database is available and configured with the following options:
  * POSTGRES_USER=postgres
  * POSTGRES_PASSWORD=root
  * PORT=5432
* The DataLoader class in the data package will load a few examples of each entity (Users, Reservation, Room Type) into the database after the service starts up.

## CSS Links

* Button : https://getcssscan.com/css-buttons-examples
* Spinner : https://loading.io/css/

## Resources

* https://www.youtube.com/watch?v=SLfhMt5OUPI - for setting the active nav bar element
* https://www.youtube.com/watch?v=rWfhwW9forg - for saving the state on a refresh
* https://blog.logrocket.com/how-to-use-axios-post-requests/ - for making POST request with axios 
* https://bobbyhadz.com/blog/react-onclick-redirect - redirect to another page on button click
* https://www.youtube.com/watch?v=YYDpGYOjfqM - for the private route function
* https://www.freecodecamp.org/news/how-to-perform-crud-operations-using-react/ - for getting the DELETE to work 
* https://www.youtube.com/watch?v=GBbGEuZdyRg - for getting the PUT to work 