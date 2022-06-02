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
