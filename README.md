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

## How to

- Start a bbb meeting and join as moderator
- Enter `@chatgpt help` in public chat to see example prompts
