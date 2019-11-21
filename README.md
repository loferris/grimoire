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
I was inspired by contemporary trends in JavaScript web development, particularly the "JAMstack" and serverless cloud architecture. As I knew my MVP for this project would be at its core a photo-editor, a guiding thought for me has been "how would a JavaScript developer build Instagram in 2019?" I built a realtime app with two "serverless" servers: a Firebase server for authentication and storage management of user images, and a GraphQL server with a Postgres database for managing user and upload information. The main channel of communication between these services is a React app with both a Firebase and Apollo Client. The challenges I faced were dealing with new technologies with limited user recipes (such as Hasura integrated with Firebase: the two could be considered competitors) and navigating the complexities of cloud architecture the entire time, as my third-party image-editing API, Imgix, required cloud hosting from the start. As a junior developer with an interest in site reliability and chaos engineering with an eye towards software architecture down the road, I also thought this approach would give me an app that was "as fun to break as it was to make," and in this I am confident I succeeded.

I appreciated being able to use frameworks and languages such as React and GraphQL that have a "home" in JavaScript: as someone more inclined to "backend" development with a fondness for Python, this approach made me feel like I was honoring JavaScript's strengths instead of trying to make a Node.js backend behave as much like a Python backend as I could make it. I think taking a "severless" approach helped me to think outside the box and expand my understanding of what building an app means beyond building a RESTful API and an Express server.

Grimoire is currently deployed here: https://grimoire-8c79e.firebaseapp.com/
