# Hotel bookings project v1

## Description 
This is a frontend application that allows the user to interact with our custom API and make the basic CRUD request using it. The 

## Prerequistes
Node.js version 18.14.0^

## Usage
* Run npm install in root folder to install dependencies.
Run npm start and navigate to localhost:3000 to view application.

* Access to Reservation data model:
```
{
    "user": string,
    "guestEmail": sting,
    "roomTypeId": number,
    "checkInDate": string,
    "numberOfNights": number,
}
```

* Access to Room type data model:
```
{
    "name": string,
    "description": string,
    "rate": number,
    "active": boolean
}
```
## Eslint

To run Eslint:
1. Start the application 
2. Inside of the terminal you want to run the command `npm run lint -- --fix` or `npm run lint`
3. You will see if there are any errors or warning that are on the app

## CSS Links

* Button : https://getcssscan.com/css-buttons-examples
* Spinner : https://loading.io/css/
