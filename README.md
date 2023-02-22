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

## 🤖 How It works

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

## 🚮 Uninstall

- Stop the docker container 
```bash
cd bigbluebutton-chatgpt

docker-compose down

```

- Remove the docker image
```bash
docker rmi <bigbluebutton-chatgpt image name>

# example
docker rmi bigbluebutton-chatgpt_bbb-chatgpt
```

## Artificial Intelligence powered Online Classes on BigBlueButton
Use live transcription, speech-to-speech translation and class notes with topics, summaries and sentiment analysis to guarantee the success of your online classes

### Transcription [DEMO](https://higheredlab.com/)
Help your students understand better by providing automated class notes
1. MP4 class recordings with subtitles
2. Full transcription of the class with topics, summary and sentiments

### Translation [DEMO](https://higheredlab.com/)
Speech-to-speech translate your classes in real-time into 100+ languages
1. Hear real-time translation of the class in any of 100+ language such as French, Spanish and German
2. View the captions in translated languages

## BigBlueButton-as-a-Service

Everything you need for online classes at scale on BigBlueButton, starting at $12 / month:
1. HD video
2. View attendance
3. Stream on YouTube
4. Integrate with Moodle
5. Upgrade/cancel anytime

[Click here to get started](https://higheredlab.com/pricing/)

## More on BigBlueButton

Check-out the following apps to further extend features of BBB.

### [bbb-mp4](https://github.com/manishkatyan/bbb-mp4)
With this app, you can convert a BigBlueButton recording into MP4 video and upload to S3. You can convert multiple MP4 videos in parallel or automate the conversion process.


### [bbb-jamboard](https://github.com/manishkatyan/bbb-jamboard)

The default whiteboard of BigBlueButton has limited features including no eraser. Many teachers wish to have a more features-rich whiteboard that would help them better in conducting online classes.

With BBB-Jamboard, you can easily integrate Google Jamboard into your BigBlueButton server.

Jamboard is a digital interactive whiteboard developed by Google and can be used in stead of the default BugBlueButton whiteboard. Google Jamboard has the eraser feature that has often been requested by BigBlueButton users.

### [bbb-admin](https://github.com/manishkatyan/bbb-admin)

Scripts for BigBlueButton admins including extracting IP of users joining, participants attendance, poll answers and many other analytics.

### [bbb-twilio](https://github.com/manishkatyan/bbb-twilio)

Integrate Twilio into BigBlueButton so that users can join a meeting with a dial-in number. You can get local numbers for almost all the countries.

### [bbb-optimize](https://github.com/manishkatyan/bbb-customize)

Better audio quality, increase recording processing speed, dynamic video profile, pagination, fix 1007/1020 errors and use apply-config.sh to manage your customizations are some key techniques for you to optimize and smoothly run your BigBlueButton servers.

### [bbb-streaming](https://github.com/manishkatyan/bbb-streaming)

Livestream your BigBlueButton classes on Youtube or Facebook to thousands of your users.

### [bbb-recording-server](https://github.com/manishkatyan/bbb-recording-server)

With this app, you can process BigBlueButton recordings on a separate server, called BBB Recording Server. Separation of recordings from BigBlueButton (client) improves performance as all server resources are dedicated towards conducting live classes.

### [100 Most Googled Questions on BigBlueButton](https://higheredlab.com/bigbluebutton-guide/)

Everything you need to know about BigBlueButton including pricing, comparison with Zoom, Moodle integrations, scaling, and dozens of troubleshooting.
