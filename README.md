<div align="center">
   <img alt="bigbluebutton" width="60" src="https://higheredlab.com/wp-content/uploads/hel_icon.png" />
</div>
<h1 align="center">BigBlueButton ChatGPT</h1>
<p align="center">Integrate ChatGpt into BigBlueButton chat.</p>

<!-- # ChatGPT app for BigBlueButton -->
<br/>

# ChatGpt App for BigBlueButton

[OpenAI](https://openai.com/) Chat GPT is an AI chatbot auto-generative system created by Open AI for online customer care. It is a pre-trained generative chat, which makes use of (NLP) Natural Language Processing.

[BigBlueButton](https://bigbluebutton.org/) is like-Zoom for online classes but at a much lower cost, with better analytics, and is open-source.

<br/><br/>

## ✨ Features
The main feature of Chat GPT is generating responses like those humans would provide, in a text box. Therefore, it is suitable for chatbots, AI system conversations, and virtual assistants. <br/>
However, it can also give natural answers to questions in a conversational tone and can generate stories poems andm ore. Moreover, Chat GPT can:

- **Write code** You can ask any coding question in the chat and Chat GPT will generate code for you.
- **Write an article or blog post** You can ask Chat GPT to write an article or blog post for you.
- **Translate** You can ask Chat GPT to translate any language to any language.
- **Debug** You can ask Chat GPT to debug your code.
- **Write a story/poem** You can ask Chat GPT to write a story or poem for you.
- **Recommend chords and lyrics** You can ask Chat GPT to recommend chords and lyrics for you.

## 🖐 Requirements

- A server with BigBlueButton 2.5 or greater installed.
- Docker
- Docker compose

## ⏳ Instllation

```sh
git clone https://github.com/AsyncWeb/bigbluebutton-chatgpt.git

cd bigbluebutton-chatgpt

#update the CHAT_GPT_API_TOKEN in .env
cp sample-env .env

# start the application
sudo docker-compose up -d
```

## 🔧 Environment variables

`REDIS_HOST`: Redis host that BigBlueButton is using

`REDIS_PORT`: Redis port that BigBlueButton is listening

`REDIS_CHANNEL`: Redis channel that BigBlueButton will send message events

`MONGO_URI`: Mongo db connection url that is used by BigBlueButton

`CHAT_GPT_API_TOKEN`: Visit https://platform.openai.com/account/api-keys to get your API token

`CHAT_GPT_ENABLED`: Enable/Disable chat gpt for bigbluebutton

`CHAT_GPT_ENABLE_FOR_VIEWER`: Enable/Disable chat gpt acces for Viewers

## 💡 How to

- Start a bbb meeting and join as moderator
- Enter `@chatGPT help` in public chat to see example prompts
