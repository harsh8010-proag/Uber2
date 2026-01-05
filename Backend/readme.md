#  Backend API Documentation

## Endpoint
## POST  `/user/register`

---

## Description
This endpoint is used to register a new user in the system. The user must provide their basic information such as full name, email, and password. The system will validate the input, hash the password, store the user in the database, and return an authentication token.

---

## **Request Body (JSON)**
The request must contain the following fields:

```json
{
  "fullname": {
    "firstname": "Harish",
    "lastname": "Patil"
  },
  "email": "harishpatil941@.com",
  "password": "34324235"
}
```

### **Field Requirements**
| Field               | Type   | Required  | Description                                              |
|-----------------------------------------------------------------------------------------------------|
| fullname.firstname  | String |   Yes     | Minimum 3 characters                                     |
| fullname.lastname   | String |   No      | Optional but should be at least 3 characters if provided |
| email               | String |   Yes     | Must be a valid email format                             |
| password            | String |   Yes     | Minimum 6 characters                                     |

---

## **Validations**
The endpoint uses **express-validator** to validate the input:
- `email` must be a valid email.
- `fullname.firstname` must be at least 3 characters.
- `password` must be at least 6 characters.

If validation fails, the response will contain an array of errors.

---

##   Success Response
###  Status Code: 201 CREATED
```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<mongodb_user_id>",
    "fullname": {
      "firstname": "Harish",
      "lastname": "Patil"
    },
    "email": "harish@example.com"
  }
}
```

### **Meaning**
- User is successfully registered.
- A JWT token is returned for authentication.
- Password is never returned because it is marked with `select:false`.

---

##  Error Responses
### Status Code: 400 BAD REQUEST
Occurs when validation fails.

Example:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Status Code: 500 INTERNAL SERVER ERROR
Occurs if something unexpected happens on the server (e.g., database error).

---

## Notes
- The password is hashed using **bcrypt** before saving.
- The `generateAuthToken()` method generates a JWT token using the user's `_id`.
- The user model automatically hides the password during selection due to `select:false`.

---

## Summary
This endpoint registers users safely with validation, password hashing, and JWT authentication. Use this endpoint when creating new user accounts.
-
#  2. Login User

### POST `/user/login`

## Description

Authenticates a user using **email and password**.\
Verifies credentials → generates a JWT token → returns user info.

------------------------------------------------------------------------

## Request Body

``` json
{
  "email": "example@gmail.com",
  "password": "yourPassword"
}
```

### Fields

  Field      Type     Required   Description
  ---------- -------- ---------- -------------------------------
  email      String   Yes        Must be a valid email
  password   String   Yes        Must be at least 6 characters

------------------------------------------------------------------------

## Success Response --- 200 OK

``` json
{
  "token": "jwt-token-here",
  "user": {
    "_id": "676abcd1234efg",
    "fullname": {
      "firstname": "Harish",
      "lastname": "Patil"
    },
    "email": "example@gmail.com"
  }
}
```

------------------------------------------------------------------------

## Error Responses

### 400 --- Validation Error

``` json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### 401 --- Invalid Email or Password

``` json
{
  "message": "Invalid Email or password"
}
```

------------------------------------------------------------------------

# 🔐 Notes

-   Passwords are hashed using **bcrypt**.
-   JWT token is created with **user.\_id** and your `JWT_SECRET`.
-   `comparePassword()` is used to verify login credentials.
-   Sensitive fields like password are returned only when selected
    explicitly.

------------------------------------------------------------------------

#  Completed Endpoints

-   `/user/register`
-   `/user/login`
