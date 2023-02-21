<div align="center">
   <img alt="bigbluebutton" width="60" src="https://higheredlab.com/wp-content/uploads/hel_icon.png" />
</div>
<h1 align="center">ChatGPT for BigBlueButton</h1>
<p align="center">Use ChatGPT to improve your BigBlueButton online classes</p>

<!-- # ChatGPT app for BigBlueButton -->
<br/>

# ChatGPT App for BigBlueButton

[OpenAI](https://openai.com/) ChatGPT is an AI chatbot auto-generative system created by Open AI for online customer care. It is a pre-trained generative chat, which makes use of (NLP) Natural Language Processing.

[BigBlueButton](https://bigbluebutton.org/) is the most-popular open-source software to conduct online classes. It is being used across thousands to schools and integrates well with Moodle, Canvas, Druple and even with your custom LMS via REST APIs. It provides everything you need for your online classes: HD audio/video conference, whiteboard, chat, presentation, polling, analytics and scales easily to conduct hundreds of classes.

## How It works

ChatGPT is a large language model trained by OpenAI that is capable of generating human-like text. By providing it with a prompt, it can generate responses that continue the conversation or expand on the given prompt.

We have integrated ChatGPT with BigBlueButton, the most popular open-source virtual classroom software. This gives teachers (and students) the ability to unleash the power of ChatGPT to make online classes better.

After installing BigBlueButton-ChatGPT app, you can invoke ChatGPT by sending `@chatgpt <prompt>` message in the Public Chat. The app would make a call to the ChatGPT API, passing the prompt, get and publish the response.

## ✨ Features

You can get started by sending `@chatgpt help` in Public Chat of BigBlueButton that would show the following prompts.

- Create a quiz with 5 multiple choice questions that assess students’ understanding of [concept being taught].
- Find the bug with this code: <post code below>
- What exactly does this regex do? rege(x(es)?|xps?).
- Describe <topic of your choice> in detail.
- Please provide a definition for the medical term ‘tachycardia’.
   
For more prompts, please refer to [this document](https://classplusplus.com/chatgpt/).

## 🖐 Requirements

- A server with BigBlueButton 2.5+ installed
- Docker with Docker compose

## ⏳ Instllation
   
It hardly takes few minues to install ChatGPT app for BigBlueButton, as detailed below: 

```sh
git clone https://github.com/AsyncWeb/bigbluebutton-chatgpt.git

cd bigbluebutton-chatgpt

#update the CHAT_GPT_API_TOKEN in .env
cp sample-env .env

# start the application
sudo docker-compose up -d
```

## 🔧 Configuration

You would need to create an account on OpenAI to get chatGPT token by visiting [this page on OpenAI](https://platform.openai.com/account/api-keys)
Update `.env` file in the project root directory, look for `CHAT_GPT_API_TOKEN` environment and set it to the token that you have got. 
   
You can enable chatGPT for all attendees of BigBlueButton or restrict it to only moderators, which is recommended in an online classroom setting. 
To enable chatGPT, set `CHAT_GPT_ENABLED` as `true` or `false` otherwise; By default, chatGPT is enabled only for moderators. 
To enable chatGPT for all attendees, set `CHAT_GPT_ENABLE_FOR_VIEWER` as `true` or `false` otherwise;
   
In addition, there are few more environment variables set, which works out-of-the-box for default BigBlueButton installation.

## 💡 How to use it

- Start a bbb meeting and join as moderator
- Enter `@chatGPT help` in public chat to see example prompts
- Use one of the example prompts to get started
