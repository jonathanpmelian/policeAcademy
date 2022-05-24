# policeAcademy
## Role Access
**User:** A user is able to add a theft bike and view the status of their thefts declaration. </br>
**Officer:** An officer owns to a department and manage just one theft case at a time. An officer is able to change the status of a theft when is done. Theft assigment is automatized. An officer is also able to search thefts by different parameters.</br>
**Director:** A director owns to a department. A director have access to the information related with the deparment.</br>
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
