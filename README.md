# Pet Grooming Web Application

Full Stack application with a MySql Database, authentication, appointment scheduling system, and real life problem solving features.

This application was created for a real pet grooming business to solve a number of issues they were facing before. 
<br>
Note: The code on this repository is not exactly the same as the one being used in production for the business (privacy, database, and confidentiality reasons), but it is close enough to show the overall functionality of this application.

![alt text](./client/public/images/screenshotApp1.jpg)

# Link to live site

https://petgroomingwebapplication.herokuapp.com/
<br>

### Credentials to test the protected components are:
For Admin: <br>
Username: test1@test.ca <br>
Password: 123456
<br>
<br>
For Employees: Username: testEmployee@email.com <br>
Password: 123456

# Issues this business faced before implementing this application

 * Employees' schedule was handled by writting manually on a physical book
 * Client's ppointments were booked using the same physical book by hand
 * Staff only had access to clients database locally from one computer
 * Physical files were over 6000 and the number was increasing rapidily occupying too much actual space on the shelves
 * In the event of a fire or robbery, all records could have been lost with no possible way to recover
 * For every pet, the clients needed to fill out a separate form to keep records of the services provided
 * The static website they had was not responsive to small screens

# Approaching the problems

### Database type

The existing clients database on the local computer had the option to be extracted as a Excel format, therefore, I was able to convert it into a csv format and import it into MySql Workbench and there was not going to be the need to manually enter the 6000+ clients into our dabatase. 
<br>
I created one table for each Employee to connect with their own calendar.
Also Three tables to handle Customers: One for clients(has many pets), one for pets (belong to clients, and has many comments), and one for comments (belong to pets). All this using Sequelize as an ORM.

# Authentication
![alt text](./client/public/images/screenshotApp2.jpg)

### Authentication (Admin)
![alt text](./client/public/images/screenshotApp4.jpg)

Authentication was implemented using two separate forms: one for the Administrator and one for the employees.
<br>
Once the Admin logs in, it is redirected to the Admin Panel to add employees with their respective credentials, as well as to see the clients database if needed. From here, it can also navigate to the staff's control panel

### Authentication (Employees)
![alt text](./client/public/images/screenshotApp3.jpg)

Once the admin creates the employees credentials, they con login using the employees form.
Then, they are redirected to the Staff's panel control where different options are provided: 
* Calendar for each staff member to handle their hours and add appointments separately
* Search clients forms to search by Phone, First Name, Last Name or Pet Name. 
* Add New clients form
* Clients list. A table that has the option to filter rows by client number, phone, etc. Each client has the More Info Button that will redirect the users to the Full page with the client information.

# Client Information Page
![alt text](./client/public/images/screenshotApp5.jpg)

On this page, the full client information is shown. From here, the staff member can edit the clients information, add pets to this client and see existing pets. Every Pet has their own comment section (Equivalent to the back of the client physical file to keep records of their services).<br>
 If a pet has not had a comment added yet, the Pet's name will be Black, on the contrary, it will be green. This feature was integrated to help them identify easily which pet has already comments and which ones don't.
![alt text](./client/public/images/screenshotApp6.jpg)

# Separate Roles Privilages 

The authentication system is implemented to grant access to different pages based on roles: Admin or employees; admin will have access to all pages, whilst employees will only have access to staff's control panel

# Thecnologies Used

## Front End

* React
* React Big Calendar
* React Table
* Bootstrap
* Css
* Axios
* Adobe Illustrator and Photoshop

## Back End

* Node Js
* Express
* MySql
* Sequelize
* Passport Js (Local Strategy)
* JWT

## Deployment

Netlify at first to support the static pages only, and then it was transfered to Heroku for database support

# Link to live site

https://petgroomingwebapplication.herokuapp.com/

Credentials to test the protected components are:
For Admin: 
Username: test1@test.ca 
Password: 123456 

For Employees: Username: testEmployee@email.com 
Password: 123456