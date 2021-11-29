Run Locally
### 1. Clone repo
#### 1.1. HTTPs method
https://github.com/ollylll97lll/Final_Project.git
#### 1.2. SSH method
git@github.com:ollylll97lll/Final_Project.git
#### 1.3. GitHub CLI method
gh repo clone ollylll97lll/Final_Project <br/>
$ cd final_project
### 2. Setup MongoDB
Atlas Cloud MongoDB <br/>
Create database at https://cloud.mongodb.com <br/>
Create .env file in root folder <br/>
Set PORT=8888<br/>
Set URI=mongodb+srv://your-db-connection<br/>
Set JWT_SECRET= *anything you like here*<br/>
if you want to use PayPal and Google Map, then go to their pages bellow and sign up for new credential keys<br/>
PayPal: https://developer.paypal.com/developer/accounts<br/>
GoogleMap: https://console.cloud.google.com<br/>
then set PAYPAL_CLIENT=*your new credential key for PayPal<br/>
Set GOOGLE_API_KEY = *your new creadential key for Google<br/>
### 3. Run Backend
$ npm install <br/>
$ npm start
### 4. Run Frontend
open new terminal <br/>
$ cd frontend <br/>
$ npm install <br/>
$ npm start
### 5. Seed Users and Products
Run this on web browser: http://localhost:8888/api/users/seed <br/>
which will return users email and password <br/>
** admin account will have isAdmin attribute set to true. <br/>
Run this on web browser: http://localhost:8888/api/products/seed <br/>
It creates 10 sample products <br/>
### 6. Admin Login
Run http://localhost:3000/signin <br/>
Enter admin email and password and click signin
