# Grimoire

A realtime photo-editing and sharing app to promote mindfulness and self-expression. Users can log in and edit their own images, giving them meaningful captions. Each user gallery functions as an "oracle deck" where they can "draw" cards for inspiration or direction.

Technologies and Frameworks used:

- React ecosystem (React-Router, emotion, Typography.js in production)
- Imgix
- Apollo Server/Client
- Gatsby (landing page in development)
- Express (Kubernetes in development)
- Firebase
- Postgres
- GraphQL
- Hasura
- Google Cloud Platform (Firebase and Google Kubernetes Engine for Hasura server)
- Heroku (Hasura in production)

Languages Used:

- JavaScript (React, Node)
- CSS, HTML
- SQL
- GraphQL

Architecture:
I was inspired by contemporary trends in JavaScript web development, particularly the "JAMstack" and serverless architecture. As I knew my MVP for this project would be a photo-editor, my guiding thought has been "how would a JavaScript developer build Instagram in 2019?" I built a realtime app with two "serverless" cloud providers: a Firebase provider for authentication and storage of user images (using Google storage buckets), and a GraphQL API with a Postgres database for managing user and upload information provisioned by Hasura. The main channel of communication between these services is a React app with both a Firebase and Apollo Client. The challenges I faced included working with new technologies with limited user recipes (such as Hasura integrations with Firebase) and navigating the complexities of cloud architecture the entire time, as my third-party image-editing API, Imgix, required cloud hosting from the start. As a junior developer with an interest in site reliability and chaos engineering and an eye towards software architecture down the road, I also thought this approach would give me an app that was "as fun to break as it was to make," and I believe I have succeeded.

I appreciated being able to use frameworks and languages such as React and GraphQL that have a "home" in JavaScript: as someone more inclined to "backend" development, this approach made me feel like I was honoring JavaScript's strengths, rather than trying to make a traditional Node.js backend run as well as a backend would in another commonly-used language such as Python or Ruby. I think taking a "severless" approach helped me to think outside the box and expand my understanding of what building an app means beyond building a RESTful API and an Express server.

Grimoire is currently deployed here: https://grimoire-8c79e.firebaseapp.com/

Installation Instructions:
Within your clone of this repo, navigate to the client directory and run:

npm install

You will now need to provision your own resources for this app.

First, set up a project in Firebase. You will be using Authentication, Hosting, and Storage. Whenever you are offered the initialization credentials, make sure to save the information (such as the JSON file) and project secrets when convenient. At some point, fill in your project secrets into a .env file for use by your client.

Set your user rules in Firebase Storage to allow authenticated users to read/write to the bucket.

Set up your Google log-in provider in Firebase Authentication (each log-in provider will have its own separate requirements: make sure to follow the instructions and consult the documentation if you run into trouble).

Set up hosting for your app and update the permissions in your Authentication and Storage where necessary. (For Authentication you will need to whitelist your new domain). You may follow deployment instructions now or later in the process.

Second, set up your account in Imigix. Add a new source, and provide the unique filepath of your storage bucket as a source, and mark type as "Google Storage Bucket." Deploy and choose a descriptive name for the Imigix subdomain. Make sure to update this URL in the client folder where you are loading an image.

Third, deploy the Hasura server. If you use Heroku, there's an integrate deploy option with Heroku postgres added on. You can import a database you build locally to Heroku or set it up yourself in the Hasura console GUI. If you use Google Kubernetes Engine, you will have to follow the documentation on Hasura and create a separate node app with the deployment.yaml and config.json files. You can now set up your postgres database. I have two tables: users and uploads. The user table has a field for id (PK) and a firebase uid. The upload table has a field for id, and upload URL, and creator id (a foreign key referencing the firebase uid in users). You may name and configure this however you like, and may use either the Hasura console's GUI or enter raw SQL, but make sure the names you use are consistent in the GraphQL queries written in the React app.

You should now be able to run the app locally by running

npm start

in the client directory. To deploy, make sure you've fully set up hosting in Firebase and run

npm run build
firebase deploy

to deploy to the web. The firebase.json file here is set up to deploy from the build folder.

Enjoy!
