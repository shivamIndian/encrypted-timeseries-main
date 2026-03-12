# Encrypted Timeseries Assignment

This project demonstrates a **real-time encrypted data pipeline** using Node.js microservices.

The system consists of two backend services that communicate using **Socket.io** and process encrypted events.

---

# Architecture

Emitter Service → Listener Service → MongoDB → Realtime Dashboard

### Components

**Emitter Service**

* Reads sample data
* Encrypts payload
* Sends events using Socket.io

**Listener Service**

* Receives encrypted events
* Decrypts and validates payload
* Stores valid data in MongoDB
* Updates the realtime dashboard

**Frontend Dashboard**

* Displays realtime statistics and data stream.

---

# Tech Stack

* Node.js
* Express.js
* Socket.io
* MongoDB
* Render (Deployment)

---

# Live Application

Hosted App:

https://listener-service-41sd.onrender.com

GitHub Repository:

https://github.com/shivamIndian/encrypted-timeseries-main

---

# Project Structure

encrypted-timeseries

emitter-service
→ Sends encrypted events

listener-service
→ Receives, decrypts and stores events

frontend
→ Realtime dashboard UI

data.json
→ Sample data used for streaming

---

# How to Run the Project Locally

## Prerequisites

Make sure the following are installed:

* Node.js (v18 or higher)
* MongoDB
* Git

Check installation:

node -v
npm -v

---

# 1 Clone Repository

git clone https://github.com/shivamIndian/encrypted-timeseries-main.git

cd encrypted-timeseries-main

---

# 2 Install Dependencies

Install dependencies for both services.

Emitter service:

cd emitter-service
npm install

Listener service:

cd ../listener-service
npm install

---

# 3 Start MongoDB

Make sure MongoDB is running.

mongod

---

# 4 Start Listener Service

cd listener-service

npm start

Server will start at:

http://localhost:5000

---

# 5 Start Emitter Service

Open another terminal.

cd emitter-service

npm start

The emitter service will start sending encrypted events to the listener service.

---

# 6 Open Dashboard

Open in browser:

http://localhost:5000

You will see realtime streaming data and statistics.

---

# Deployment

The project is deployed on **Render** using two services:

* Listener Service
* Emitter Service

MongoDB is hosted using **MongoDB Atlas**.

---

# Author

Shivam Sharma
