# Messaging v2 Demo
Demo app for the telstra messaging API

## Getting Started
A live demo of Happy Chat that utilizes the callback methods of the messaging API is available [here](https://happy-chat-heroku.herokuapp.com)


**Note that your phone number can be seen in the message ID of sent SMS's and will be able to be seen by other people using the live version of Happy Chat at the same time as you are. Happy Chat does not store any data and all message information is sent directly to the Messaging API over HTTPS**

Alternatively clone this repo and run Happy Chat locally. You need to have [Node.js and NPM installed](https://nodejs.org/en/) to run Happy Chat, also note that the messaging API callbacks will not hit routes running locally. To demonstrate callback functionality locally try using [request bin](https://requestb.in/) in combination with [Postman.](https://www.getpostman.com/)


Once [Node.js and NPM](https://nodejs.org/en/) have been installed, navigate to the happy-chat directory and run
```
npm install
```
```
npm start
```
Then navigate to localhost:8080   


To enable live reloading you need to open two terminals in the happy-chat directory. In one terminal run
```
npm run build
```
This will rebuild your client side code whenever changes are saved. Run the express server in a serperate terminal:
```
npm start
```
Because changes are being served by the Express server the page will need to be refreshed to see the changes made to your client side code. Any changes made to code on the server side will require the server to be restarted to take effect.


## About Happy Chat
Happy Chat is a small chat app that will send SMS, MMS, display the status of sent messages and show any replies sent back to the API to the screen. Happy Chat utilizes the MEAN stack, Telstra messaging API, the messaging API Node.js SDK and socket.io. 

In the live version of Happy Chat, any phone numbers entered into the app are not stored anywhere and phone numbers hitting the server are censored before being sent back to the client. The version in this repo doesn't censor any content to demonstrate the exact functionality of the messaging API and SDK. 

Messages sent back to Happy Chat are free for Australian phone numbers. International numbers will be charged a standard rate based on their service provider. Note that MMS messages are more expensive than SMS.

## How to use
Create a file named .env in the root directory of the Happy Chat app. Inside .env create two new environment variables and set the values as your own client_id and client_secret. More information on .env can be found [here](https://github.com/motdotla/dotenv)
```
CLIENT_ID=YOUR-CLIENT-ID
CLIENT_SECRET=YOUR-CLIENT-SECRET
```
Also replace the values for myNumber and myNotifyURL inside demo.component.ts with your own provisioned phone number and whatever URL you want your message status notifications to be sent to respectively. The app can now be run by following the 'Getting Started' instructions above.