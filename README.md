# Documentation on Login Signup Logic

This is a small project to better understand creating users and allowing them to sign in to an application. Additionally, user sessions are defined, as well as some parameters are set up.

## Pre-requisites

- Visual Studio Code Installed
- Node.js Installed
- Install Express
- Set up & Connect MongoDB

## Folder Directory Structure

```
config
├── keys
data
└── db
models
└── user.js
node_modules
routes
└── auth.js
views
├── dashboards.ejs
├── signin.ejs
└── signup.ejs
.env
index.js
package-lock.json
package.json
```

## In the `auth.js` File

### Step 1
In the `auth.js`, import the following:

```javascript
express
passport
router
bcrypt
jwt
```

### Step 2
Configure Google OAuth Strategy:

- Add the Google auth routes.
- Once there is a successful authentication, redirect to the dashboard.

### Step 3
Set up the local signup route. Note to check if the user already exists.

### Step 4
Hash the password.

### Step 5
Create the new user.

### Step 6
Save the user to the database.

### Step 7
Redirect to the login after a successful signup.

### Step 8
Set up the local sign-in route. Note to check if the user already exists, compare the hashed password, and generate a JWT token.

### Step 9
Redirect to the dashboard after a successful login.

### Step 10
Define the signup form route (GET Request) - render the `signup.ejs` file.

### Step 11
Define the sign-in form route (GET Request) - render the `signin.ejs` file.

### Step 12
Define the dashboard route (GET Request) - render the `dashboard.ejs` file.

## In the `index.js` File

### Step 1
Import the following:

```javascript
express
mongoose
passport
session
authRoutes
app
```

### Step 2
Set up the body parser middleware.

### Step 3
Set up the session middleware.

### Step 4
Set up the passport middleware.

### Step 5
Set up the view engine.

### Step 6
Set up auth routes.

### Step 7
Set up a MongoDB connection.

### Step 8
Set up the default route.

### Step 9
Start the server.
