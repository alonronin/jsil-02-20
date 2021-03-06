Infinite Scale with Node.js and CloudRun
===

> My JavaScript Israel lecture at 02/2020 event demo code.

https://youtu.be/-ZkAj0aZrYc

### The Application

We want to post a `url`, scrape the site and extract its meaningful content.

### Demo
https://static-bwvy2exxkq-ew.a.run.app

### Screenshot
![Infinite Scale With CloudRun and Node.js](./screenshot.png)

### The Architecture

Micro-services, talking with each other via REST http requests.

1. `Scraper` - private service to scrape a site with puppeteer.
2. `Parser` - private service to extract meaningful content from html.
3. `Api` - public service that accepts post request with the `url` to scrape.
4. `Static` - public service to serve the frontend react application.

### Infrastructure

All services are built with Docker and deploy to Google CLoud Run.

### Run it locally

just `git clone` and `yarn start-all` to run it locally.

go to http://localhost:8080
