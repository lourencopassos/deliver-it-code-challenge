# ⌛️ Deliver IT Code Challenge - Node Js

<br>

----

<br>

## 🚀 Challenge
Create a Backend application that manages bills, calculates interest and overdue days.

## 👨🏽‍💻 Tech Stack
- Node.js
- Typescript
- Express
- Jest
- Docker
- Mongoose
- MongoDB
- React
- Javascript

## 📝 Functional Requirements
- Add bills
- Calculate intereset based on based passed since the bill expired
- Update the bill's due_dates and price with interest the they are fetched from database

### 💡 Extras 

- `✅` Use container in the application
- `✅` Write unit tests for the application
- `❌` Create a frontend


## 🏃‍♂️ How to run this application

1. `git clone` to download the repository;
2. `cd backend && npm install && npm run start` to install the backend dependencies and run locally;
3. `cd backend &&  docker-compose up` to run the application in Docker container

## 🛤 Endpoints

### 🛒 Base URL: If the backend is running locally, the base url is: http://localhost:3000/, if it's running via Docker it's http://localhost/api/v1 .

### 🔐 Routes

<br>

**`GET /bills`** This endpoint returns a list of the bills registered

_Example response_

```

[
    {
        "_id": "603b3826b58874d4ef18d159",
        "name": "Conta de jogos",
        "original_price": 100,
        "due_date": "2021-02-21T03:00:00.000Z",
        "paid_at": "2021-02-23T03:00:00.000Z",
        "price_with_interest": 102.2,
        "overdue_days": 2,
        "__v": 0
    },
    {
        "_id": "603b3867b58874d4ef18d15a",
        "name": "Conta de luz",
        "original_price": 167,
        "due_date": "2021-03-01T03:00:00.000Z",
        "__v": 0,
        "overdue_days": 0,
        "price_with_interest": null
    },
    {
        "overdue_days": 28,
        "name": "Conta de super",
        "paid_at": null,
        "price_with_interest": 113.4,
        "original_price": 100,
        "id": "603bd6b55fddb707d839f6fe",
        "due_date": "2021-02-01T03:00:00.000Z"
    }
]


``` 

<br>

**`POST /bills`** This endpoint registers a bill

|key|format|
| --------- | --------- |
| due_date | MM/DD/YYYY |
| original_price | integer |
| name | string |
| paid_at? | MM/DD/YYYY  |   
|key|format|
| --------- | --------- |
| due_date | MM/DD/YYYY |
| original_price | integer |
| name | string |
| paid_at? | MM/DD/YYYY  |   
<br>

_Example request

```
{
    "due_date": "02/28/2021",
    "original_price": 100,
    "name": "Conta de luz",
    "due_date": "03/01/2021"
}

```

<br>


#### 👋🏽 How to reach me

Lourenço Passos | Fullstack Software Engineer | lo.passos93@gmail.com | 55-51-996106010





