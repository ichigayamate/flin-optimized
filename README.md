# Flin Optimized
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

## Key Decisions Made
1. For advancing into part 2, I use Next.js instead of typical Vite + ReactJS because of server-side rendering feature and optimizations that Next.js provides, for example automatic code splitting and image optimization.
2. For styling, I used Tailwind CSS and Daisy UI, primarily due to purging nature of Tailwind CSS which is later used in part 2
3. For the chatbot, I stored a .json file containing the questions and answers, and then it used regex to match the question provided by user. Using regex makes it easier to match the question and return respective answer.
4. During part 2, I used `next/image` for image optimization, which is a built-in feature of Next.js. This feature automatically optimizes images on-demand as users request them, for example by utilizing lazy loading and preventing layout shift. This is important for performance and user experience, as it reduces loading times and improves the overall responsiveness of the application.
5. I did part 3 and part 5 at the same time, because I think it is easier to do both at once since some of part 3 endpoints requires authentication, which is part of part 5. To hash password, I use bcrypt as it makes the password more resistant to brute-force attacks. For database, I used MongoDB and Mongoose as ODM.
6. As part of part 3, I used `react-hook-form` for form validation and submission, which is a popular library for handling forms in React. This library makes me easier to manage form state and validation, as I did not manually declare each state for each input field.
7. Because I have a work background in IT Architecture, I used tools such as Brainboard to design the architecture diagram of the application while generating the Terraform code at the background. Brainboard also requires me to manually fill in the details of each component, such as type of instance, region, and I also required to assign it to another component (such as from EC2 to RDS). This is a good practice for me to understand the architecture and how each component interacts with each other as writing down Terraform code manually will make me harder to understand the architecture. This tools transforms me from previously using draw.io to now using Brainboard to propose cloud computing infrastructure.