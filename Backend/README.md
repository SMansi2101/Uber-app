# UBER Backend Documentation

## Description
This backend API handles user authentication, including registration, login, profile retrieval, and logout.

## API Endpoints

### 1. Register a New User
**Endpoint:** `POST /users/register`

**Description:** Registers a new user by validating input and creating an account.

**Request Body:**
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "password": "securepassword"
}
```

**Response:**
```json
{
    "token": "jwt_token_here",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "johndoe@example.com"
    }
}
```

**Validation Rules:**
- `fullname.firstname` (required, min 3 characters)
- `fullname.lastname` (optional, min 3 characters)
- `email` (required, valid email format)
- `password` (required, min 6 characters)

**Error Response (400 - Bad Request):**
```json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "First name at least 3 characters long",
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

---

### 2. User Login
**Endpoint:** `POST /users/login`

**Description:** Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
    "email": "johndoe@example.com",
    "password": "securepassword"
}
```

**Response:**
```json
{
    "token": "jwt_token_here",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "johndoe@example.com"
    }
}
```

**Error Response (400 - Bad Request):**
```json
{
    "message": "Invalid email or password"
}
```

---

### 3. Get User Profile
**Endpoint:** `GET /api/users/profile`

**Description:** Retrieves the authenticated user's profile information.

### HTTP method
`GET`

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>`


### 4. Logout User
**Endpoint:** `POST /api/users/logout`

**Description:** Logs out the currently authenticated user and blacklist the token provided in cookie or headers.
 
### HTTP method
`GET`

### Authentication
Requires a valid JWT token in the authorization token or cookie:

### 5. Register a Captain
**Endpoint:** `POST /api/captains/register`

**Description:** Registers a new captain with vehicle details.

**Request Body:**
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "captain@example.com",
    "password": "securepassword",
    "vehicle": {
        "colour": "red",
        "plate": "MH 12 NT 5312",
        "capacity": 3,
        "vehicleType": "car"
    }
}
```

**Response:**
```json
{
    "token": "jwt_token_here",
    "captain": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "captain@example.com",
        "status": "inactive",
        "vehicle": {
            "colour": "red",
            "plate": "MH 12 NT 8783",
            "capacity": 3,
            "vehicleType": "car"
        }
    }
}
```

**Validation Rules:**
- `fullname.firstname` (required, min 3 characters)
- `fullname.lastname` (required, min 3 characters)
- `email` (required, valid email format)
- `password` (required, min 6 characters)
- `vehicle.colour` (required, min 3 characters)
- `vehicle.plate` (required, min 3 characters)
- `vehicle.capacity` (required, min 1)
- `vehicle.vehicleType` (required, one of: car, motorcycle, auto)


## Additional Notes
- Input validation is handled using `express-validator`.
- Passwords are securely hashed before being stored.
- JWT tokens are used for authentication.
- Ensure the `Authorization` header is correctly set for protected routes.

