const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const chatGPT = axios.create({
  baseURL: process.env.CHAT_GPT_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.CHAT_GPT_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

/**
 * @param {string} prompt - The prompt to send to the API
 * @returns {Promise} - The response from the API
 * @description Get a response from the API
 * @example
 * const response = await chatGptService.getResponseFromChatGPT({ prompt: "what is 1 + 1" });
 * console.log(response); // "2"
 *
 */

async function getResponseFromChatGPT({ prompt }) {
  try {
    const { data } = await chatGPT.post("/v1/completions", {
      model: "text-davinci-003",

      // append the stop sequence to the prompt so the API knows when to stop generating text.
      prompt: `${prompt.trim()} ${process.env.CHAT_GPT_STOP_SEQUENCE}}`,
      temperature: 0,
      max_tokens: 1000,
      stop: [process.env.CHAT_GPT_STOP_SEQUENCE],
    });
    return data.choices[0].text.trim();
  } catch (error) {
    const err = error.response ? error.response.data : error.message;
    console.error(err);
    throw error;
  }
}

/**
 * @param {object} user - The user object from the database
 * @returns {boolean} - Whether the user is a moderator or not
 * @description Check if the user is a moderator
 * @example
 *  const user = {
 *   role: "MODERATOR"
 * };
 * const isChatGPTAllowed = chatGptService.isChatGPTAllowed(user);
 * console.log(isChatGPTAllowed); // true
 *
 */
function isChatGPTAllowed(user) {
  // If viewer are allowed to use chagt gpt then return tru
  if (process.env.CHAT_GPT_ENABLE_FOR_VIEWER === "true") {
    return true;
  }

  // If chagpt is only enabled for moderators then return true if the user is a moderator
  if (process.env.CHAT_GPT_ENABLE_FOR_VIEWER === "false") {
    return user.role === "MODERATOR";
  }
}

/**
 * @param {string} message - The message to remove the "@chatGPT" command from
 * @returns {string} - The message without the "@chatGPT" command
 * @description Remove the "@chatGPT" command from the message
 * @example
 * const message = "@chatGPT what is 1 + 1";
 * const prompt = chatGptService.getPrompt(message);
 * console.log(prompt); // "what is 1 + 1"
 */
function getPrompt(message) {
  //replace all @chatGPT with empty string and remove any leading or trailing spaces
  return message.replace(/@chatGPT/gi, "").trim();
}

module.exports = {
  getResponseFromChatGPT,
  isChatGPTAllowed,
  getPrompt,
};
