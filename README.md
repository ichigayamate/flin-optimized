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
1. Start both `server` and `client`
2. Open `http://localhost:3000` to access frontend
3. To open chatbot, click the chat icon in the bottom right corner, then click the button of the question you may ask.

## Backend API Documentation
Backend API Documentation is located on the `server/README.md`