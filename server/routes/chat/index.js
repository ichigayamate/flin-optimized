const fs = require("fs");
const path = require("path")
const {generateResponse} = require("../../utils/response");
const {BadRequestError} = require("../../utils/error-handler");
const router = require('express').Router();

const chatbotData = JSON.parse(fs.readFileSync(path.join(__dirname, 'chatbot.json'), 'utf-8'));

function getResponse(userInput) {
  for (const intent of chatbotData.intents) {
    for (const pattern of intent.patterns) {
      const regex = new RegExp(`^${pattern}`, 'i');
      if (regex.test(userInput)) {
        return intent.responses[Math.floor(Math.random() * intent.responses.length)];
      }
    }
  }
  return "Sorry, I don't understand that. You may ask simple question like: 'How do I apply?', 'Who can apply?', or 'What services do you offer?'";
}

router.post('/', (req, res) => {
  const userInput = req.body.message;
  if (!userInput) throw new BadRequestError("Message is required");
  const response = getResponse(userInput);
  generateResponse(res, response);
});

module.exports = router;
