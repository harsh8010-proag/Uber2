# /users/register Endpoint Documentation

## **Endpoint**
**POST** `/user/register`

---

## **Description**
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
  "email": "harish@example.com",
  "password": "yourpassword"
}
```

### **Field Requirements**
| Field | Type | Required | Description |
|-------|-------|----------|--------------|
| fullname.firstname | String | Yes | Minimum 3 characters |
| fullname.lastname | String | No | Optional but should be at least 3 characters if provided |
| email | String | Yes | Must be a valid email format |
| password | String | Yes | Minimum 6 characters |

---

## **Validations**
The endpoint uses **express-validator** to validate the input:
- `email` must be a valid email.
- `fullname.firstname` must be at least 3 characters.
- `password` must be at least 6 characters.

If validation fails, the response will contain an array of errors.

---

## **Success Response**
### **Status Code: 201 CREATED**
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

## **Error Responses**
### **Status Code: 400 BAD REQUEST**
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

### **Status Code: 500 INTERNAL SERVER ERROR**
Occurs if something unexpected happens on the server (e.g., database error).

---

## **Notes**
- The password is hashed using **bcrypt** before saving.
- The `generateAuthToken()` method generates a JWT token using the user's `_id`.
- The user model automatically hides the password during selection due to `select:false`.

---

## **Summary**
This endpoint registers users safely with validation, password hashing, and JWT authentication. Use this endpoint when creating new user accounts.

