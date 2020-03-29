# FastFeet

## Description

Backend for a fictitious carrier, FastFeet.

### Tools

- [x] Sucrase + Nodemon
- [x] ESLint + Prettier + EditorConfig
- [x] Sequelize (PostgreSQL)

### Features

- [x] Authentication

  - [x] Request methods
    - [x] POST - Login
  - [x] Seed Default User Administration
  - [x] JWT
  - [x] Validation Input

- [x] Recipent Management

  - [x] Request methods
    - [x] GET - List
    - [x] POST - Create
    - [x] PUT - Update
  - [x] Database Table Name
    - [x] recipients
  - [x] Permission for Create
    - [x] Only Administrator
  - [x] Recipient may not sign in
  - [x] GET - Recipient list is filtered by recipient name, if the parameter is not passed, return all recipients

- [x] Delivery Management

  - [x] Request methods
    - [x] GET - List
    - [x] POST - Create
    - [x] PUT - Update
    - [x] DELETE - Delete
  - [x] Only Authentication Administrator
  - [x] GET - List of deliverers be filtered by the name of the deliverers, if the parameter is not passed, return all deliverers

- [x] Order Management
  - [x] Request methods
    - [x] GET - List
    - [x] POST - Create
    - [x] PUT - Update
    - [x] DELETE - Delete
  - [x] GET - Order list is filtered by product name, if the parameter is not passed, return all orders
  - [x] Column start_date must be registered as soon as the product is withdrawn
  - [x] Column end_date must be registered when the delivery guy finishes the delivery
  - [x] Columns recipient_id and deliveryman_id must be registered at the time the order is registered
  - [x] When order registered to delivery man, you receive an e-mail with order details
  - [x] Deliverer Resources
    - [x] View Orders
      - [x] GET - Deliverer view your orders by entering your ID, return order that are not delivered or cancelled
      - [x] List all orders have already been delivered, based on your registration ID
    - [x] Change Order Status
      - [x] Add a route to register the date (start_date) of withdrawal [ Delivery man can only make 5 withdrawals ]
      - [x] Add a route to register the delivery date (end_date) [ Allow sending an image that will fill the signature_id field of the order table ]
- [x] Delivery Problems
  - [x] GET - Route for distributor list all deliveries with any problems
  - [x] GET - Route to list the problems of an order based on the ID
  - [x] POST - Route for the delivery man to register problems in the delivery only informing order ID
  - [x] DELETE - Route to distributor cancel a delivery based on the problem ID, the deliverer should receive an email informing him about the cancellation
