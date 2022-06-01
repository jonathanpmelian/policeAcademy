# policeAcademy
<img width="800" alt="image" src="https://user-images.githubusercontent.com/89730979/171272185-4c231f2e-661f-4b09-a27b-c09119e7bbf4.jpg"></br>
[![Netlify Status](https://api.netlify.com/api/v1/badges/5fe7e98d-36c2-49bf-a374-139604df2a00/deploy-status)](https://app.netlify.com/sites/policeacademylp/deploys)
## Description
Stolen bikes are a typical problem in big cities. The Police want to be more efficient in resolving stolen bike cases. They decided to build a software that can automate their processes.
Theft are automatically assigned to free officers when a new theft is created or when an officer resolved an assigment.
## Data Model
<img width="511" alt="image" src="https://user-images.githubusercontent.com/89730979/171474139-24c62e00-9368-488a-b79e-cc9d854f0a69.png"></br>
## Role Access </br>
**User:** A user is able to add a theft and view the status of their thefts declarations. </br></br>
**Officer:** An officer owns to a department and manage just one theft case at a time. He is able to mark a theft as resolved and can search thefts filtering by different parameters.</br></br>
**Director:** A director owns to a department. He can register new officers to his department.</br></br>
**Admin:** An admin is able to register roles different to default user.
## API Endpoints

All API Request must be prepended with `/api`

### Authentication Endpoints

The AUTHENTICATION flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
POST   | /auth/signup     | NO    | -              | User Signup                | `name`, `surname`, `email`, `password`, `role`  | `token`
POST   | /auth/login      | NO    | -              | User Login                 | `email`, `password`                             | `token`

The DEPARTMENT flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
POST   | /department      | YES   | Director       | Create a Department        | `name` `director`                               | `name` `director` `officers`

The THEFTS flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /thefts          | YES   | -              | Show all thefts            |                                                 | **user:** [`licenseNumber` `color` `type` `date` `description` `address` `status`]  **others:** [`licenseNumber` `color` `type` `owner` `date` `description` `address` `status`]
GET    | /thefts/:theftId | YES   | -              | Show a theft               |                                                 | **user:** `licenseNumber` `color` `type` `date` `description` `address` `status`  **others:** `licenseNumber` `color` `type` `owner` `date` `description` `address` `status`
POST   | /thefts          | YES   | -              | Create a theft             | `license number`                                | `licenseNumber` `color` `type` `owner` `date` `description` `address` `status`

The USER flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /user            | YES   | -              | View my profile            |                                                 | `name` `surname` `email` `role`
