# policeAcademy
<img width="800" alt="image" src="https://user-images.githubusercontent.com/89730979/171272185-4c231f2e-661f-4b09-a27b-c09119e7bbf4.jpg"></br>
[![Netlify Status](https://api.netlify.com/api/v1/badges/5fe7e98d-36c2-49bf-a374-139604df2a00/deploy-status)](https://app.netlify.com/sites/policeacademylp/deploys)
## Description
Stolen bikes are a typical problem in big cities. The Police want to be more efficient in resolving stolen bike cases. They decided to build a software that can automate their processes.
Theft are automatically assigned to free officers when a new theft is created or when an officer resolved an assigment.
## Data Model
<img width="511" alt="image" src="https://user-images.githubusercontent.com/89730979/171474139-24c62e00-9368-488a-b79e-cc9d854f0a69.png"></br>
## Badges
![image](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![image](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)
![image](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![image](https://img.shields.io/badge/nuxt.js-00C58E?style=for-the-badge&logo=nuxtdotjs&logoColor=white)
![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![image](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)
![image](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![image](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![image](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)
![image](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![image](https://img.shields.io/badge/Vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=white)
![image](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Mongo](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
## Preview
<img width="511" alt="image" src="https://user-images.githubusercontent.com/89730979/171680801-0c035937-d74f-48c0-9ed3-287bf1069a4f.png"></br>
## Role Access </br>
**User:** A user is able to add a theft and view the status of their thefts declarations. </br></br>
**Officer:** An officer owns to a department and manage just one theft case at a time. He is able to mark a theft as resolved and can search thefts filtering by different parameters.</br></br>
**Director:** A director owns to a department. He can register new officers to his department.</br></br>
**Admin:** An admin is able to register roles different to default user.
## API Endpoints

All API Request must be prepended with `/api`

### Authentication Endpoints

The AUTHENTICATION flow for the application is: https://documenter.getpostman.com/view/18826957/Uz5FKwjf
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
POST   | /auth/signup     | NO    | -              | User Signup                | **user**: `name`, `surname`, `email`, `password` **others**:`name`, `surname`, `email`, `password`, `role`  | **user**:`token` **others**: `user`
POST   | /auth/login      | NO    | -              | User Login                 | `email`, `password`                             | `token`

The DEPARTMENT flow for the application is:
https://documenter.getpostman.com/view/18826957/Uz5FKwfM
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
POST   | /department      | YES   | Director       | Create a Department        |  `name`                                         | `name` `director` [`officers`]

The THEFTS flow for the application is: https://documenter.getpostman.com/view/18826957/Uz5FKwtb
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /thefts          | YES   | -              | Show all thefts            |  **!user**: `query` (optional)                | **user:** `licenseNumber` `color` `type` `date` `description` `address` `status` `department` `geoPoints` **others:** `licenseNumber` `color` `type` `owner` `date` `description` `address` `status` `department` `geoPoints`
GET    | /thefts/:theftId | YES   | -              | Show a theft               |                                                 | `licenseNumber` `color` `type` `date` `description` `address` `status` `geoPoints`  `owner` `department` 
POST   | /thefts          | YES   | User           | Create a theft             | `licenseNumber` `color` `type` `date` `description` `address` | `licenseNumber` `color` `type` `owner` `date` `description` `address` `status`
PUT   | /thefts/:theftId  | YES   | Officer        | Mark as resolved           |                                                 | `theft` (new assignation)

The USER flow for the application is: https://documenter.getpostman.com/view/18826957/Uz5FKwjm
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /user            | YES   | -              | View my profile            |                                                 | **user**:`name` `surname` `email` `role` `thefts`  **officer**: `name` `surname` `email` `role` `department` `caseAssigned`
