const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gmail.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gmail.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gmail.com",
        DOB:"21-03-1989",
    },
];

// Define a route handler to GET request to the root path "/"
router.get("/",(req,res)=>{
    // Send a JSON response containing the users array, formatted with an indentation of 4 spaces for readability
  res.send(JSON.stringify({users}, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
    // Extract the email parameter from the request URL
    const email = req.params.email;
    // Filter the users array to find users whose email matches the extracted email parameter
    let filtered_users = users.filter((user) => user.email === email);
    // Send the filtered_users array as the response to the client
    res.send(filtered_users);
});



// POST request: Create a new user
router.post("/",(req,res)=>{
    // Push a new user object into the users array based on query parameters from the request
    users.push({
        "firstName": req.query.firstName,
        "lastName": req.query.lastName,
        "email": req.query.email,
        "DOB": req.query.DOB
    });
    // Send a sucess message as the response, indicating the user has been added
    res.send("The user " + req.query.firstName + " has been added!");
  });


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Extract email parameter and find users with matching email
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);

  if (filtered_users.length > 0) {
    // Select the first matching user and update attributes if provided
    let filtered_user = filtered_users[0];

    // Extract and update DOB if provided

    let DOB = req.query.DOB;
    if (DOB) {
        filtered_user.DOB = DOB;
    }

    // Extract and update firstName if provided
    let firstName = req.query.fistName;
    if (firstName) {
        filtered_user.firstName = firstName;
    }

    // Extract and update lastName if provided
    let lastName = req.query.lastName;
    if (lastName) {
        filtered_user.lastName = lastName;
    }

    // Replace old user entry with updated user
    users = users.filter((user) => user.email != email);
    users.push(filtered_user);

    // Send sucess message indicating the user has been updated
    res.send(`User with the email ${email} updated`);
  } else {
    // Send error message if no user found
    res.send("Unable to find user!");
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Extract the email parameter from the request url
  const email = req.params.email;
  // Filter the users array to exclude the user with the specified email
  users = users.filter((user) => user.email != email);
  // Send a sucess message as the response, indicating the user has been deleted
  res.send(`User with the email ${email} deleted.`);
});

// GET by specific last name request: Retrieve a single user with the last name
router.get("/lastName/:lastName", (req, res) => {
    // Extract the lastName parameter from the request URL
    const lastName = req.params.lastName;
    // Filter the users array to find users whose lastName matches the extracted lastName parameter
    let filtered_lastName = users.filter((user) => user.lastName === lastName);
    // Send the filtered_lastName array as the response to the client
    res.send(filtered_lastName);
});

// Function to convert a date string in the format "dd-mm-yyyy" to a Date object
function getDateFromString(strDate) {
    let [dd, mm, yyyy] = strDate.split('-');
    return new Date(yyyy + "/" + mm + "/" + dd);
}

// Define a route handler for GET requests to the "/sort" endpoint
router.get("/sort", (req, res) => {
    // Sort the users array by DOB in ascending order
    let sorted_users = users.sort(function(a, b) {
        let d1 = getDateFromString(a.DOB);
        let d2 = getDateFromString(b.DOB);
        return d1 - d2;
    });
    // Send the sorted_users array as the response to the client
    res.send(sorted_users);
});


module.exports=router;
