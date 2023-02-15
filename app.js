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
    process.env.CHAT_GPT_ENABLED == undefined ||
    process.env.CHAT_GPT_ENABLED != "true"
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
    if (!chatGptService.isModerator(user)) return;

    // Remove the @chatGPT command from the prompt
    const prompt = chatGptService.getPrompt(body.msg.message);

    if (prompt === "help") {
      const newTimeStamp = +new Date();
      envelope.timestamp = newTimeStamp;
      const newMsg = `🤖 ChatGPT: You may use prompts such as the followings to get meaningful response from chatGPT: \n
      1. @chatGPT Create a quiz with 5 multiple choice questions that assess students' understanding of [concept being taught]. \n
      2. @chatGPT Find the bug with this code: [post code below] \n
      3. @chatGPT What exactly does this regex do? rege(x(es)?|xps?). \n
      4. @chatGPT Describe [topic of your choice] in detail. \n
      5. @chatGPT Please provide a definition for the medical term 'tachycardia'. \n
      <a href="https://classplusplus.com/chatgpt/" target="_blank">Click here</a> for more ChatGPT prompts. \n
      `;
      // Update the message body
      body.msg.message = newMsg;
      event.core.body = body;
      // Publish the new message to the channel
      await publisher.publish(CHANNEL, JSON.stringify(event));
      return;
    }
    // Get the response from the chatGPT API
    const response = await chatGptService.getResponseFromChatGPT({ prompt });
    const newTimeStamp = +new Date();

    // Update the message timestamp
    envelope.timestamp = newTimeStamp;
    const newMsg = `🤖 ChatGPT: ${response}`;

    // Update the message body
    body.msg.message = newMsg;
    event.core.body = body;
    // Publish the new message to the channel
    await publisher.publish(CHANNEL, JSON.stringify(event));
  } catch (error) {
    console.error(error);
    //check if it is axios error
    if (!error?.response?.data) return;
    const newTimeStamp = +new Date();

    // Update the message timestamp
    event.envelope.timestamp = newTimeStamp;
    const newMsg = `🤖 ChatGPT: ${error.response.data.error.message}`;
    // Update the message body
    event.core.body.msg.message = newMsg;
    await publisher.publish(CHANNEL, JSON.stringify(event));
  }
}
