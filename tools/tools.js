const { json } = require('body-parser');

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
    const regex = new RegExp(`${userInput}$`, "u");

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

function user_check(NewUser, password) {



    if (same_check("username", NewUser["username"])) {
        const fs = require('fs');

        // Read the JSON file
        const jsonData = JSON.parse(fs.readFileSync('./Data/userData.json', 'utf8'));

        const userInput = NewUser["username"]; // Replace with user input

        const user_detect = jsonData.filter(users => users.username === userInput)

        if (NewUser[password] === user_detect[0][password]) {
            new_jsonData = jsonData.map((user) => {
                if (user.username == userInput) {
                    user.isLoggedIn = true
                    return user
                } else {
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

function find_user(username) {
    const fs = require("fs")
    const users = JSON.parse(fs.readFileSync("./Data/userData.json", "utf8"))
    return users.filter(x => x.username === username)
}

function off_login(username) {
    const fs = require('fs');

    // Read the JSON file
    const jsonData = JSON.parse(fs.readFileSync('./Data/userData.json', 'utf8'));
    const new_jsonData = jsonData.map((user) => {
        if (user.username == username) {
            user.isLoggedIn = false;
            return user
        } else {
            return user
        }
    })
    fs.writeFileSync("./Data/userData.json", JSON.stringify(new_jsonData))

}

function write_to_the_json(username, parameter, element) {
    const fs = require('fs');

    // Read the JSON file
    const jsonData = JSON.parse(fs.readFileSync('./Data/userData.json', 'utf8'));
    const new_jsonData = jsonData.map((user) => {
        if (user.username == username) {
            user[parameter] = element;
            return user
        } else {
            return user
        }
    })
    fs.writeFileSync("./Data/userData.json", JSON.stringify(new_jsonData))

}

function update_profile(user) {
    const user_saved = find_user(user.last_username)[0]
 
    
    if (user_saved.isLoggedIn) {
        var valid_input = check_data(user)
        console.log(valid_input);
        
        
        if (valid_input.check_true) {
            write_to_the_json(user.last_username, password, user.password)
            write_to_the_json(user.last_username, email, user.email)
            write_to_the_json(user.last_username, Gnder, user.Gnder)
            write_to_the_json(user.last_username, username, user.username)
            var users = [user.username, user.password, user.email, user.Gnder];
            var inputIsValid = [...valid_input.inputIsValid, ...users]
            return [true, inputIsValid]
        } else {
            if (user_saved.username === user.username) {
                valid_input.inputIsValid[0] = false;
            };
            if (user_saved.email === user.email) {
                valid_input.inputIsValid[3] = false;
            }
            console.log(user_saved.username);
            console.log(user.username);
            console.log(valid_input.inputIsValid);
            
            for (const key in valid_input.inputIsValid) {
                if (valid_input.inputIsValid[key]) {
                    var users = [user_saved.username, user_saved.password, user_saved.email, user_saved.Gnder];
                    var inputIsValid = [...valid_input.inputIsValid, ...users]
                    return [true, inputIsValid]
                }
            }
            write_to_the_json(user.last_username, "password", user.password)
            write_to_the_json(user.last_username, "email", user.email)
            write_to_the_json(user.last_username, "Gnder", user.Gnder)
            write_to_the_json(user.last_username, "username", user.username)
            var users = [user.username, user.password, user.email, user.Gnder];
            var inputIsValid = [...valid_input.inputIsValid, ...users]
            return [true, inputIsValid]
        }

    } else {
        return [false, []]
    }

}

module.exports = {
    check_data, //check users if valid or not
    Save_obj, // save the object to the json file
    user_check, // on the islogin parameter
    find_user, //find the user with user name in the json data
    off_login, //of the islogin parameter
    update_profile //update the profile
};