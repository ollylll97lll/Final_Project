Run Locally
### 1. Clone repo
#### 1.1. HTTPs method
https://github.com/ollylll97lll/Final_Project.git
#### 1.2. SSH method
git@github.com:ollylll97lll/Final_Project.git
#### 1.3. GitHub CLI method
gh repo clone ollylll97lll/Final_Project
$ cd final_project
### 2. Setup MongoDB
Atlas Cloud MongoDB
Create database at https://cloud.mongodb.com
Create .env file in root folder
Set URI=mongodb+srv://your-db-connection
### 3. Run Backend
$ npm install
$ npm start
### 4. Run Frontend
open new terminal
$ cd frontend
$ npm install
$ npm start
### 5. Seed Users and Products
Run this on web browser: http://localhost:8888/api/users/seed
which will return users email and password
** admin account will have isAdmin attribute set to true.
Run this on web browser: http://localhost:8888/api/products/seed
It creates 10 sample products
### 6. Admin Login
Run http://localhost:3000/signin
Enter admin email and password and click signin
