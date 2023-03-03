const Redis = require("redis");
const chatGptService = require("./chatGPT");
require("dotenv").config();

const { MONGO_URI } = process.env;
const MongoDB = require("./mongo-client");

// MongoDB config
const MONGODB_CONFIG = {
  url: MONGO_URI,
};

// Create a new MongoDB client
const mongodb = new MongoDB(MONGODB_CONFIG.url);

// Redis config
const REDIS_CONFIG = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

// Redis channel name to listen to
const CHANNEL = process.env.REDIS_CHANNEL;

// Create a client and publisher
const publisher = Redis.createClient(REDIS_CONFIG);
const client = publisher.duplicate();

// Connect to Redis
client.connect();
publisher.connect();

// Connect to MongoDB
mongodb.connect();

// Handle Redis connection errors
client.on("connect", () => {
  console.log("Client Connected to Redis");
});

client.on("error", (err) => {
  console.log("Client Error " + err);
});

publisher.on("connect", () => {
  console.log("Publisher Connected to Redis");
});

publisher.on("error", (err) => {
  console.log("Publisher Error " + err);
});

// Subscribe to the channel
client.subscribe(CHANNEL, handleChatGPTCall);

// Handle the chatGPT call

async function handleChatGPTCall(data) {
  if (
    process.env.CHAT_GPT_ENABLE == undefined ||
    process.env.CHAT_GPT_ENABLE != "true"
  )
    return;

  let event;
  try {
    event = JSON.parse(data);

    if (!event?.envelope?.name) return;

    const { envelope } = event;
    const { name } = envelope;

    const body = event.core.body;
    const message = body?.msg?.message;
    let isChatGPTCall = false;

    // Check if the message is a chatGPT call case insensitive
    if (
      name === "SendGroupChatMessageMsg" &&
      message?.toLowerCase().startsWith("@chatgpt")
    ) {
      isChatGPTCall = true;
    }

    if (!isChatGPTCall) return;

    const userId = envelope?.routing?.userId;

    if (!userId) return;

    // Get the user from the database
    const [user] = await mongodb.query({
      dbName: "meteor",
      collectionName: "users",
      query: { userId: envelope.routing.userId },
    });

    if (!user) return;

    // Check if the user is a moderator
    if (!chatGptService.isChatGPTAllowed(user)) return;

    // Remove the @chatGPT command from the prompt
    const prompt = chatGptService.getPrompt(body.msg.message);

    // if prompt empty send  @chatGPT help
    if (!prompt) {
      sendMessage({
        publisher,
        message: `Prompt is empty!\nPlease use <i style="color:var(--color-primary,#0F70D7);">@chatGPT help</i>  to see prompt examples.`,
        event,
        CHANNEL,
      });

      return;
    }

    // if prompt is help send help message
    if (prompt === "help") {
      const newMsg = `You may use prompts such as the followings to get meaningful response from chatGPT: \n
      1. @chatGPT Create a quiz with 5 multiple choice questions that assess students' understanding of [concept being taught]. \n
      2. @chatGPT Find the bug with this code: [post code below] \n
      3. @chatGPT What exactly does this regex do? rege(x(es)?|xps?). \n
      4. @chatGPT Describe [topic of your choice] in detail. \n
      5. @chatGPT Please provide a definition for the medical term 'tachycardia'. \n
      <a href="https://classplusplus.com/chatgpt/" target="_blank">Click here</a> for more ChatGPT prompts. \n
      `;

      sendMessage({
        publisher,
        message: newMsg,
        event,
        CHANNEL,
      });

      return;
    }
    // Get the response from the chatGPT API
    const response = await chatGptService.getResponseFromChatGPT({ prompt });

    //if response is empty send error message
    if (!response) {
      sendMessage({
        publisher,
        message: "Something went wrong. Please try again later.",
        event,
        CHANNEL,
      });
      return;
    }
    sendMessage({
      publisher,
      message: response,
      event,
      CHANNEL,
    });
    return;
  } catch (error) {
    console.error(error);
    //check if it is axios error
    if (!error?.response?.data) return;
    sendMessage({
      publisher,
      message: error.response.data.error.message,
      event,
      CHANNEL,
    });

    return;
  }
}

function sendMessage({ publisher, message, event, CHANNEL }) {
  try {
    const { envelope } = event;
    const body = event.core.body;
    const newTimeStamp = +new Date();
    envelope.timestamp = newTimeStamp;
    const newMsg = `🤖 <span style="color: blue;">ChatGPT</span>: ${message}`;
    // Update the message body
    body.msg.message = newMsg;
    event.core.body = body;
    // Publish the new message to the channel
    publisher.publish(CHANNEL, JSON.stringify(event));
  } catch (error) {
    console.error(error);
  }
}
