# Filwuha Orders


Our project aims to bring a solution for customers that rely on being present on the bathing service provider premises to verify if they can access their services.

Table of Contents

    ## Installation
    ## Usage
    ## Endpoints
    ## Technologies Used
    ## Contributing

## Installation

To install the Filwuha Orders application, you will need to have Node Js installed on your computer. You will also need to have a MongoDB database installed and running. It's free.

To install the necessary dependencies, run the following commands in your terminal:

- git clone https://github.com/AbduselamNur/filwuha_ms.git

To run your backend API flask app, you will need python installed in your system:

# Set up virtual environment (if applicable)

cd backend
python -m venv ve // create a virtual environment first
source ve/bin/activate // activate the virtual environment

# Install dependencies

pip install -r requirements.txt

# Set up database and Run migrations (if applicable)

configure the environmental variables inside the .env file
flask db init
flask db migrate -m 'Initial Migration'
flask db upgrade

# Start the application

python app.py

## To run your frontend web app

You will need node installed in your system:

cd frontend

npm install

npm start

The application should now be accessible via a web browser at http://localhost:3000

## Usage

The application is a web application that allows users to book reservations for their bath service at Filwuha.
Admins are created with a mysql query (inserting: username, email, hashed-password to the admins table)

## Endpoints

The application has the following endpoints:
Endpoints

Here are the API endpoints available in the Filwuha Orders application:

    POST /api/book - Adds a new order.


    GET /api/admin/orders - Retrieves all orders.


    GET /api/admin/orders/:id - Retrieves an order by its ID.


    PUT /api/admin/updateOrder/:id - Updates an order by its ID.


    DELETE /api/admin/orders/:id - Deletes an order by its ID.

    POST /api/admin/login - Authenticates the Admin with the correct username and password, and generated token

# Technologies Used

    Flask
    MySQL
    SQLAlchemy
    React
    Tailwind css

# Contributing

Contributions are welcome. Please create a pull request with your changes.
