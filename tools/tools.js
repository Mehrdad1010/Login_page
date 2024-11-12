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
            }else {
            }
        });
    });

}

function same_check(Key, strain_param) {
    const fs = require('fs');

    fs.readFile('./Data/userData.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
  
        let jsonData = JSON.parse(data);

        // Add the new object to the list
        jsonData.push(User_Obj);
    
        // Write the modified JSON back to the file
        fs.writeFile('./Data/userData.json', JSON.stringify(jsonData), (err) => {
            if (err) {
                console.error('Error writing file:', err);
            }else {
            }
        });
    });
    
}


module.exports = {
    Save_obj
    same_check
};