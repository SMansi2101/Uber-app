# UBER Backend Documentation

### Description
This endpoint is used to register a new user. It validates the user's input and creates a new account if all required fields are provided correctly. Upon successful registration, it returns a token and the user details.

### Request Method
POST

### URL
`/users/register`

### Required Data

- **fullname.firstname**: string (minimum 3 characters) - Required  
- **fullname.lastname**: string (minimum 3 characters) - Optional  
- **email**: string (must be a valid email, minimum 5 characters) - Required  
- **password**: string (minimum 6 characters) - Required  

#### Example Request Body
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "password": "securePassword123"
}
```

### Responses
-**user(object)**
-**Token(string)**:JWT Token

#### Success (201 Created)
- **Status Code**: 201  
- **Response Body**:
    ```json
    {
        "token": "jwt_token_here",
        "user": {
            "fullname": {
                "firstname": "John",
                "lastname": "Doe"
            },
            "email": "johndoe@example.com",
            // other user fields...
        }
    }
    ```

#### Error (400 Bad Request)
- **Status Code**: 400  
- **Response Body**:
    ```json
    {
        "errors": [
            {
                "msg": "Invalid Email",
                "param": "email",
                "location": "body"
            },
            {
                "msg": "First name at least 3 characters Long",
                "param": "fullname.firstname",
                "location": "body"
            },
            {
                "msg": "Password must be at least 6 characters long",
                "param": "password",
                "location": "body"
            }
        ]
    }
    ```

## Additional Notes
- Input validation is performed using `express-validator`.
- The user's password is hashed before being stored.
- A JWT token is generated and returned upon successful registration.
