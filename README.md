# Home Board React App

This is a personal project I created to help me get comfortable with Javascript, React and API calls.

## Functionalities

- Show date and time
- Show todo list made on Microsoft Todo
- Show currently playing song in Spotify
- Show weather
- Show a random quote
- Show a random background image
- Tell a joke
- Search the definition of something on Wikipedia
- Voice assistant with more functionality

## Pre-Requisites

- Node.js
- Spotify Pro account
- Microsoft account
- OpenWeatherMap account

## Installing the project

To download this project, cloan this Git repository and install the node dependencies by running:

    $ npm install

This project also depends on a Spotify server which you can download from [this repository](https://github.com/Femi236/pi-app-spotify-server)

## Setting up the application

Before being able to run the application, you will have to create a .env file in the root folder and define 2 variables:

    $ REACT_APP_WEATHER_API_KEY=""
    $ REACT_APP_MICROSOFT_CLIENT_KEY=""

The quotation marks can be replaced with the API keys you receive once creating accounts for [OpenWeatherMap Api](https://openweathermap.org/) and [Microsoft AzureAD](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)

## Running the application

The [Spotify server](https://github.com/Femi236/pi-app-spotify-server) that you installed earlier has to be run first by following the instructions on that repository.

The application can then be run by typing the following in the terminal:

    $ npm start

This will open a new browser window in [localhost:3000](http://localhost:3000).

## Running the application as a desktop application

It is also possible to run the application as a desktop application by typing typing the following in the terminal:

    $ npm run-script electron-dev

## Resources used

There were numerous resources that had to be used in order to create this pplication but these are the ones that had the largest impact on the progress.

- [Programming with Mosh ReactJs tutorial](https://youtu.be/Ke90Tje7VS0)
- [Bootstrap Tutorial](https://youtu.be/9cKsq14Kfsw)
- [ReactJs API tutorial](https://youtu.be/GuA0_Z1llYU)
- [Electron Application Tutorial](https://youtu.be/VCl8li22mrA)
- [React App to Electron Desktop App](https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3)
- [Voice Assistant Tutorial in Python](https://youtu.be/AWvsXxDtEkU)

## API's Used

- [OpenWeatherMap](https://openweathermap.org/)
- [AzureAD](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
- [QuotesAPI](https://type.fit/api/quotes)
- [Spotify](https://github.com/Femi236/pi-app-spotify-server)
- [JokesAPI](https://sv443.net/jokeapi/v2/)
- [Wikipedia](https://www.mediawiki.org/wiki/API:Main_page)
- [Lorem Picsum](https://picsum.photos/)
