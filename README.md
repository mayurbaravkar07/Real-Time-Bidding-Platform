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

7.See the Documentation for the  Understanding of  API's 
# Rate Limiting
The project uses rate limiting to prevent abuse. Each IP is limited to 150 requests per 20 minutes.

# Socket.io
Socket.io is used to handle real-time bid updates and notifications.



