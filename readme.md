# Setup

Modified following MERN Boilerplate for this assignment: 
```
https://github.com/keithweaver/MERN-boilerplate
```

Run following command in terminal to install dependencies.

```
npm install
```

For running in dev mode: 

```
npm run start:dev
```

For running in prod mode: 

```
npm start
```

## Lint

```
npm run lint
npm run lintfix
```

## Middlewares

I've used custom middleware to check payload and queries coming from front-end to make sure server only accepts which we specified for the API. 
For eg, try sending anything other than `pageURL` query in `/fetch-html` service.

## Steps/Tech Stack

- For scraping, casperjs is used, as Instagram is built using react. Make sure you have phantomjs installed and set as your env variable.
- For verifying, do `phantomjs -v` in your terminal.
- When picking stack for this app, I chose MERN as React is quite good to develop apps fast. I've used a [boilerplate](https://github.com/keithweaver/MERN-boilerplate) for setting up the baic skeleton of app but modified it a lot.
- To make sure service can only be requested with a specific set number of params or payload or queries, I've build a middleware (read more in middleware section).
- In case of serer down, `unable to fetch` message will be showed to user on submit.
- I've not much focused on UI, so you'll find a very basic but functional look of page powered by bootstrap components.

## Sample URLs

```
mukul._jain  #Private handle, will give error
jroman1964   #Will work
```

## Improvement

1. One think I would have done, was to run it in separate threads as it is quite slow right now.