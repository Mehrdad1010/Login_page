<h1>
Login Page
</h1>
<br>
<p>By using ejs, express, registration and login system is created, which allows users to register and enter their personal profile.
Save user registration information including username, password, email, and genset in a dataData.json file.
In addition to the registration information in the JSON file, there is an attribute called isLoggedin for each user, whose initial value (when registering) is false. (It is mandatory to consider all fields).</p>
<ol style="list-style-type:upper-alpha">
<li>
Username must be unique and this must be checked when registering. (required for the user)
</li>
<li>
Password: minimum length of eight, at least one number, one letter and mandatory
</li>
<li>
E-mail: The entered e-mail address has been checked and the e-mail pattern has been observed. (required)
</li>
<li>
The gender field should be considered optional for the user, and if the user does not select it, it will be the default value.
</li>
<li>
If the registration is successful, the user should be redirected to the login page.
</li>
<li>
When logging in, if the user does not match the password, the appropriate message will be displayed to the user.
</li>
<li>
If the entered information is correct, the user will be transferred to his profile. At this time, the value of the isloggedin attribute must be changed to true for the user who is logged in.
</li>
<li>
On the user's profile page, he can see his details, if necessary, he can edit them, there is also the possibility of editing the password. A check should be placed and if its value is equal to false, the carer should be thrown out of the profile, so to speak, and he is not allowed to operate)
</li>
<li>
In the login area, put a button to reset the password so that users can enter their profile and change the password by entering their username and email, if they match. (Pay attention to isloggedin)
</li>
<li>
There is also a logout feature on the profile page, when clicking on the logout button, the value of isloggedin is changed to false and the user is directed to the login page.
</li>
</ol>