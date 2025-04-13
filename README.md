# Flin + Chatbot
This is a repository demonstrating FLIN website with a chatbot

## Techstack
### Backend
- Node.js + Express
- Mongoose
- MongoDB

### Frontend
- ReactJS + Nextjs
- Tailwindcss
- Daisy UI

## How to install
1. Make sure to have MongoDB installed on your PC or you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) as an alternative.
2. Make sure to enable modern `yarn`. To enable modern `yarn`, open terminal then type:
```bash
npm install -g corepack
corepack enable
yarn set version stable
```
⚠️ If you are running windows, make sure to open terminal as administrator before running this command

3. Open `server` folder, then type:
```bash
yarn
```
4. Create `.env` file and set server environment file according to `.env.example` file
5. Start the server by typing 
```bash
yarn start
```
6. Open `client` folder, then type:
```bash
yarn
```
7. Create `.env` file and set client environment file according to `.env.example` file
8. Start the server by typing 
```bash
yarn build
yarn start
```

## How to use
### Part 1: Chatbot
1. Start both `server` and `client`
2. Open `http://localhost:3000` to access frontend
3. To open chatbot, click the chat icon in the bottom right corner, then click the button of the question you may ask.

### Part 3: API Integration
1. Start both `server` and `client`
2. Open `http://localhost:3000` to access frontend, then click "Apply now"
3. Fill in the form, then click "Submit"
4. Check the data in the database using MongoDB Compass or any other MongoDB client.

### Part 5: Database & Authentication Task
1. Using postman, create user, then login using the same user
2. Check the response, you should get a JWT token
3. Use the JWT token to access the protected route. For references on what the protected routes are, check [API Documentation](server/README.md)

## Backend API Documentation
Backend API Documentation is located on the [server/README.md](server/README.md).

## Frontend Optimization (Part 2)
Frontend optimization is located on the [client/README.md](client/README.md).

## AWS & WordPress Hosting Infrastructure (Part 4)
See [wordpress-deployment/README.md](wordpress-deployment/README.md).