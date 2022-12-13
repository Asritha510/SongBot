# SongBot
Creating a song bot similar to chat bot using Telegram bots.
Used KPOP API from Rapid API to build the song bot.
Linked Google Firebase to maintain the record of user credentials and searches.


Database Linking:

Go to console.firebase.google.com and create a project. You will be redirected to Project Overview Page, from the build drop down, select Firestore Database and click on create Database. For security reasons, start in Test mode and select nam5 in location. Create a collection and initialise the database structure. Go to project settings and service accounts tab, select Node.js SDK configuration and click on generate new private key. This will download the API key to access your database, so do not share it with others. Rename the file as serviceAccountkey.json and place it in the root of your project directory.
