# ChatGPT app for BigBlueButton

## Discription

## Requirements

- A server with BigBlueButton 2.5 or greater installed.
- Docker
- Docker compose

## Instllation

```sh
git clone https://github.com/AsyncWeb/bigbluebutton-chatgpt.git

cd bigbluebutton-chatgpt

#update the CHAT_GPT_API_TOKEN in .env
cp sample-env .env

# start the application
sudo docker-compose up -d
```

## Environment variables

`REDIS_HOST`: Redis host that BigBlueButton is using

`REDIS_PORT`: Redis port that BigBlueButton is listening

`REDIS_CHANNEL`: Redis channel that BigBlueButton will send message events

`MONGO_URI`: Mongo db connection url that is used by BigBlueButton

`CHAT_GPT_API_TOKEN`: Visit https://platform.openai.com/account/api-keys to get your API token

`CHAT_GPT_ENABLED`: Enable/Disable chat gpt for bigbluebutton

`CHAT_GPT_ENABLE_FOR_MODERATOR`: Enable/Disable chat gpt acces for Moderators

`CHAT_GPT_ENABLE_FOR_VIEWER`:  Enable/Disable chat gpt acces for Viewers

## How to

- Start a bbb meeting and join as moderator
- Enter `@chatGPT help` in public chat to see example prompts
