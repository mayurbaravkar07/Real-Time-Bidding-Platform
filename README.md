# Project Setup and Running Instructions

# Test in Postman 
  ## Drive --> https://drive.google.com/file/d/10rkWGtDAn2ETP4BnHrtdK8DLAK3cB3gC/view?usp=sharing

# Documented API 
  ## Drive -->  https://drive.google.com/file/d/12ReWz1ESTGa1VMK1UYPWUGd6eUhQxZHa/view?usp=sharing

## Prerequisites

- Node.js (v20.14.0)
- npm (10.7.0 or higher)
- PostgreSQL (or any other database supported by Prisma)

## Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/mayurbaravkar07/Real-Time-Bidding-Platform.git
   cd Real-Time Bidding Platform

2. Install the dependencies:

    npm install

3.There is no need to create Local Database as i have created  Virtual Database(on supabase -postgres Instance) and added the link in env varaibles  

4.Pushed .env variables as it is    

5. To start the srever in root run -$ node server.js 

6.Hit API Endpoints 


# API Endpoints -

# Auth Controller

POST /auth/register
Description: Registers a new user.
Input: JSON object containing name, email, and password.
Output: JSON object containing the newly registered user details or an error message.

POST /auth/login
Description: Logs in a user.
Input: JSON object containing email and password.
Output: JSON object containing the JWT token and user details or an error message.
User Controller

GET /user/profile
Description: Gets user details by ID.
Input: JWT token
Output: JSON object containing user details or an error message.

PUT /user/reset-password
Description: Sends a password reset link to the user's email.
Input: JSON object containing email.
Output: Message regarding mail sent or an error message.

DELETE /user/reset-password/
Description: Resets the user's password.
Input: JSON object containing token and newPassword.
Output: Success message or an error message.

# Item Controller

GET /items
Description: Retrieves all items.
Input: None.
Output: JSON array containing all items or an error message.

GET /items/paginated
Description: Retrieves items with pagination.
Input: Query parameters for pagination (e.g., page, limit).
Output: JSON array containing paginated items or an error message.

GET /items/byId/
Description: Retrieves item details by ID.
Input: URL parameter id.
Output: JSON object containing item details or an error message.

POST /items/create
Description: Creates a new item.
Input: JSON object containing item details.
Output: JSON object containing the newly created item details or an error message.
Authentication: Requires a valid JWT token.

GET /items/search
Description: Searches for items based on query parameters.
Input: Query parameters for searching (e.g., name, category).
Output: JSON array containing items that match the search criteria or an error message.

PUT /items/update/
Description: Updates item details by ID.
Input: URL parameter id, JSON object containing updated item details.
Output: JSON object containing the updated item details or an error message.
Authentication: Requires a valid JWT token.

DELETE /items/delete/
Description: Deletes an item by ID.
Input: URL parameter id.
Output: JSON object with a success message or an error message.
Authentication: Requires a valid JWT token.

# Bid Controller
POST /items/
/bid
Description: Places a new bid on an item.
Input: URL parameter itemId, JSON object containing bid_amount.
Output: JSON object containing the new bid details or an error message. Notifies all connected clients in real-time about their bids and when they are outbid using mail (Nodemailer).

GET /items/
/bids
Description: Gets all bids for an item.
Input: URL parameter itemId.
Output: JSON array containing bids or an error message.
Notification Controller

GET /notifications
Description: Gets all notifications for the logged-in user.
Input: None.
Output: JSON array containing notifications or an error message.

PUT /notifications/mark-read
Description: Marks all notifications as read.
Input: Authentication Token Required.
Output: JSON object with a success message or an error message.
Error Handling
The project uses centralized error handling. All errors are caught and returned in a consistent format.

# Rate Limiting
The project uses rate limiting to prevent abuse. Each IP is limited to 150 requests per 20 minutes.

# Socket.io
Socket.io is used to handle real-time bid updates and notifications.



