# policeAcademy

## API Endpoints

All API Request must be prepended with `/api`

### Authentication Endpoints

The AUTHENTICATION flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
POST   | /auth/signup     | NO    | -              | User Signup                | `name`, `surname`, `email`, `password`, role`   | `token`
POST   | /auth/login      | NO    | -              | User Login                 | `email`, `password`                             | `token`

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
