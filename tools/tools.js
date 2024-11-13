function Save_obj(User_Obj) {
    const fs = require('fs');

    // Read the existing JSON file
    fs.readFile('./Data/userData.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        User_Obj.isLoggedIn = false;

        // Parse the JSON data
        let jsonData = JSON.parse(data);

        // Add the new object to the list
        jsonData.push(User_Obj);

        // Write the modified JSON back to the file
        fs.writeFile('./Data/userData.json', JSON.stringify(jsonData), (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
            }
        });
    });

}

function same_check(Key, strain_param) {

    const fs = require('fs');

    // Read the JSON file
    const jsonData = JSON.parse(fs.readFileSync('./Data/userData.json', 'utf8'));

    const userInput = strain_param; // Replace with user input

    // Create a regular expression to match usernames
    const regex = new RegExp(`${userInput}`, "u");

    var NameUsers = jsonData.map(user => user[Key])

    // Iterate through the users and check for a match
    let isUsernameExists = false;
    for (const i in NameUsers) {
        if (regex.test(NameUsers[i])) {
            isUsernameExists = true;
            break;
        }
    }

    return isUsernameExists

}


function validatePassword(password) {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
}

function validateEmail(email) {
    const regex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    return regex.test(email);
}

function check_data(NewUser) {
    check_true = true;
    var inputIsValid = [false, false, false, false];
    if (same_check("username", NewUser["username"])) {
        inputIsValid[0] = true
        check_true = false;
    };

    if (!validatePassword(NewUser["password"])) {
        inputIsValid[1] = true
        check_true = false;
    };

    if (!validateEmail(NewUser["email"])) {
        inputIsValid[2] = true
        check_true = false;
    };

    if (same_check("email", NewUser["email"])) {
        inputIsValid[3] = true
        check_true = false;
    };
    return { inputIsValid, check_true }
}

function user_check(NewUser) {

    console.log(same_check("username", NewUser["username"]));

    if (same_check("username", NewUser["username"])) {
        const fs = require('fs');

        // Read the JSON file
        const jsonData = JSON.parse(fs.readFileSync('./Data/userData.json', 'utf8'));

        const userInput = NewUser["username"]; // Replace with user input

        const user_detect = jsonData.filter(users => users.username === userInput)
        
        if (NewUser["password"] === user_detect[0]["password"]) {
            new_jsonData = jsonData.map((user)=>{
                if (user.username == userInput) { 
                    user.isLoggedIn = true
                    return user
                }else {
                    return user
                }
            })
            fs.writeFileSync("./Data/userData.json", JSON.stringify(new_jsonData))
            return true
        } else {
            return false
        }

    } else {
        return false
    }


}

module.exports = {
    check_data,
    Save_obj,
    user_check
};