# tech-blog

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Task was to build a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts. This app has been built completely from scratch and deployed to Heroku. The app follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Directory Structure](#directory-structure)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Acknowledgements](#acknowledgements)
- [Questions](#questions)
- [License](#license)

## Installation

​Install dependencies using:

    npm install

## Usage

Login to mysql using the terminal using and the follow with your password:

    mysql -u root -p

The db schema will be added using the following:

```mysql
source .db/schema.sql

```

Mock seeds have been created and will be added using the following:

    npm run seed

The application will then be invoked by using the following command:

    npm start

## Directory Structure

```md
.
├── assets/
├── config/
├── controllers/
│ ├── api/
| | ├── blogRoutes.js
| | ├── commentRoutes.js
| | ├── userRoutes.js
| | └── index.js
│ ├── homeRoutes.js
│ └── index.js
├── db/
├── models/
│ ├── Blog.js
│ ├── Comment.js
│ ├── User.js
│ └── index.js
├── seeds/
├── utils/
├── views/
│ ├── layouts/
│ └── partials/
├── .env
├── .gitignore
├── LICENSE
├── package.json
├── README.md
└── Server.js
```

## Technologies Used

- Node.js
- Express.js
- MySQL
- Sequelize (ORM)
- mysql2
- marked and dompurify (support styling blogs with markdown)
- dotenv
- Heroku

## Setup

- Nodejs must be installed
- MySQL must be installed
- Insomnia is recommended to test routes
- MySQL Workbench (MySQL GUI recommended but not required)
- Text editor (VS Code recommended)

## Acknowledgements

- https://www.npmjs.com/package/bcrypt
- https://www.npmjs.com/package/connect-session-sequelize
- https://www.npmjs.com/package/dompurify
- https://www.npmjs.com/package/dotenv
- https://www.npmjs.com/package/express
- https://www.npmjs.com/package/express-handlebars
- https://www.npmjs.com/package/express-session
- https://www.npmjs.com/package/jsdom
- https://www.npmjs.com/package/marked
- https://www.npmjs.com/package/mysql2
- https://www.npmjs.com/package/nodemon
- https://www.npmjs.com/package/sequelize

## Questions

Created by: [@moedaaboul](https://github.com/moedaaboul)

Feel free to contact me via [muhammad.daaboul1989@gmail.com](muhammad.daaboul1989@gmail.com)!

## License

This work is licensed under
[MIT](#).
