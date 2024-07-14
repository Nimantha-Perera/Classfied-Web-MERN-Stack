// Import required modules
const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const session = require("express-session");
const crypto = require("crypto");
const fs = require("fs");
const axios = require("axios");
const cookieParser = require("cookie-parser"); // Import cookie-parser module
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const passport = require("passport");
// const User = require('./models/User'); // Import the User model
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./localStorage");
const User = require("./models/User"); // Adjust the path accordingly

// Generate a random secret key
const generateRandomString = (length) => {
  return crypto.randomBytes(length).toString("hex");
};
const secretKey = generateRandomString(32); // Generate a 32-character random string
// ...

// Use the cors middleware to enable CORS for all routes

// Your routes and other middleware...

// Create an Express app
const app = express();
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Enable credentials (cookies, authorization headers)
  })
);

//google login
// Configure Passport
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "159185290196-4rvljteon21t4il2i0u6dhhf9jbvcng8.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // You can handle user creation and login here based on the profile data.
      // Typically, you would save the user in your database and serialize/deserialize the user.
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); // Assuming user.id exists
});

passport.deserializeUser((id, done) => {
  // Find the user by id and pass it to done
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Configure session middleware
// Set up session middleware (example, you might use a different one)
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
);
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Inside the Google OAuth callback route
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // In your React component after a successful authentication callback
    if (req.isAuthenticated()) {
      console.log("User is authenticated on the client side");
      console.log("User details:", req.user);

      // Extract the relevant data
      const f_name = req.user.given_name;
      const l_name = req.user.family_name;
      const email = req.user.email;

      // Create an object with the extracted data
      const userData = { f_name, l_name, email };

      // Add user data to local storage
      localStorage.setItem("userData", JSON.stringify(userData));

      // Redirect to your React app
      res.redirect("http://localhost:3000");
    } else {
      console.log("User is NOT authenticated on the client side");
      res.redirect("http://localhost:3000"); // Redirect without user data
    }
  }
);


// Define a route to check if the user is logged in
// Define a route to check if the user is logged in
app.get("/check-login", (req, res) => {
  if (req.isAuthenticated()) {
    // User is already authenticated, return a response indicating that the user is logged in
    console.log("User is already logged in");
    res.json({ loggedIn: true, user: req.user }); // You can also send user data if needed
  } else {
    // User is not logged in, return a response indicating that the user is not logged in
    console.log("User is NOT authenticated on the server side");
    res.json({ loggedIn: false });
  }
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser()); // Use cookie-parser middleware

// Configure express-session middleware
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set secure to true if using HTTPS
      httpOnly: true, // Prevent client-side scripts from accessing the cookie
    },
  })
);

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "check_ads",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Configure multer to store uploaded images in the "ads_images" directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(--path.dirnameirname, "ads_images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Serve static files from the "public" directory
app.use(express.static("public"));
app.use("/ads_images", express.static("ads_images"));

// Root route
app.get("/", (req, res) => {
  res.send("Hello, this is the root page.");
});

// Insert ad route
// Insert ad route
app.post("/insert-ad", upload.array("selectedImages"), async (req, res) => {
  const adData = req.body;

  // Validate the required fields and uploaded image URLs
  if (
    !adData.selectedCategory ||
    !adData.selectedSubCategory ||
    !adData.selectedDistrict ||
    !adData.selectedSubTown ||
    !adData.title ||
    !adData.description ||
    !adData.price ||
    !adData.selectedImages ||
    adData.selectedImages.length !== 5 ||
    adData.selectedImages.slice(0, 3).some((imgUrl) => imgUrl === null)
  ) {
    return res
      .status(400)
      .json({ error: "Missing or invalid required fields" });
  }

  try {
    // Extract the first 5 image URLs
    const [img, img1, img2, img3, img4] = adData.selectedImages;

    // Handle optional values
    const brand = adData.brand || null;
    const condition = adData.condition || null;
    const propertyType = adData.propertyType || null;
    const acres = adData.acres || null;
    const perches = adData.perches || null;
    const instituteName = adData.institute_name || null;

    // Insert URLs into the database
    const query = `
    INSERT INTO users_ads (status, main_category, sub_category, brand, disthrick, sub_town, institute_name, title, \`condition\`, description, price, mobile_num, propertyType, acres, perches, img, img1, img2, img3, img4, created_at, user_id, first_name, last_name, tumb_img)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,? , NOW(), ?, ?, ? ,?)
  `;
    const values = [
      "pending_approval",
      adData.selectedCategory,
      adData.selectedSubCategory,
      brand,
      adData.selectedDistrict,
      adData.selectedSubTown,
      instituteName,
      adData.title,
      condition,
      adData.description,
      adData.price,
      adData.verifiedNumber,
      propertyType,
      acres,
      perches,
      img,
      img1,
      img2,
      img3,
      img4,
      adData.user_id,
      adData.f_name,
      adData.l_name,
      adData.uploadedImageURL,
    ];

    const connection = await pool.getConnection();
    await connection.query(query, values);
    connection.release();

    console.log("Ad inserted successfully");

    // Now, update the user's mobile_num column in the "users_table"
    const updateUserMobileQuery = `
      UPDATE reg
      SET mobile_number = ?
      WHERE id = ?;
    `;

    const updateUserMobileValues = [
      adData.verifiedNumber, // The new mobile number to update to
      adData.user_id,       // The user_id of the user to update
    ];

    const connection2 = await pool.getConnection();
    await connection2.query(updateUserMobileQuery, updateUserMobileValues);
    connection2.release();

    console.log("User mobile number updated successfully");

    res.status(200).json({ message: "Ad inserted successfully" });
  } catch (err) {
    console.error("Error inserting ad or updating mobile number:", err);
    res.status(500).json({ error: "Error inserting ad or updating mobile number" });
  }
});


//Fetch add Details new

app.get("/api/ad/:adId", async (req, res) => {
  const adId = req.params.adId;

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the SQL query
    const [rows] = await connection.execute(
      "SELECT * FROM users_ads WHERE id = ?",
      [adId]
    );

    // Release the connection back to the pool
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ error: "Ad not found" });
    }

    const adDetails = rows[0];
    res.json(adDetails);
  } catch (error) {
    console.error("Error fetching ad details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//User Upload Add shown

app.get("/api/ad/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the SQL query
    const [rows] = await connection.execute(
      "SELECT * FROM users_ads WHERE user_id = ?",
      [userId]
    );

    // Release the connection back to the pool
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ error: "No ads found for the user" });
    }

    // If you want to return all matching rows, you can send the 'rows' array
    res.json(rows);

    console.log(rows);
  } catch (error) {
    console.error("Error fetching ad details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Add Details Shown

// app.get("/api/fetch_add/:adId", async (req, res) => {
//   try {
//     const { adId } = req.params;

//     // Define the SQL query to fetch ad details by ad ID
//     let query = "SELECT * FROM users_ads WHERE id = ?";

//     // Use the MySQL pool for executing queries
//     pool.getConnection((err, connection) => {
//       if (err) {
//         console.error("Error getting database connection:", err);
//         res.status(500).json({ error: "Error fetching ad details" });
//         return;
//       }

//       // Execute the SQL query with the ad ID parameter
//       connection.query(query, [adId], (error, results) => {
//         connection.release(); // Release the connection back to the pool

//         if (error) {
//           console.error("Error fetching ad details:", error);
//           res.status(500).json({ error: "Error fetching ad details" });
//           return;
//         }

//         // If the query was successful, send the results as JSON response
//         if (results.length === 0) {
//           // Handle the case where the ad with the specified ID was not found
//           res.status(404).json({ error: "Ad not found" });
//         } else {
//           console.log("Ad details fetched successfully");
//           res.status(200).json(results[0]);
//         }
//       });
//     });
//   } catch (err) {
//     console.error("Error fetching ad details:", err);
//     res.status(500).json({ error: "Error fetching ad details" });
//   }
// });






// Mobile Numbers User

app.get("/api/mobile-number/:userId", async(req, res) => {
  const userId = req.params.userId;

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the SQL query
    const [rows] = await connection.execute(
      "SELECT * FROM reg WHERE id = ?",
      [userId]
    );

    // Release the connection back to the pool
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ error: "No ads found for the user" });
    }

    // If you want to return all matching rows, you can send the 'rows' array
    res.json(rows);

    console.log(rows);
  } catch (error) {
    console.error("Error fetching ad details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Search Ads and fetch

// app.get("/search-ads", async (req, res) => {
//   try {
//     const { query } = req.query;

//     const searchQuery = `
//       SELECT * FROM users_ads WHERE
//       brand LIKE ? OR
//       main_category LIKE ? OR
//       disthrick LIKE ? OR
//       sub_town LIKE ? OR
//       title LIKE ?
//     `;

//     const params = [
//       `%${query}%`,
//       `%${query}%`,
//       `%${query}%`,
//       `%${query}%`,
//       `%${query}%`,
//     ];

//     const connection = await pool.getConnection();
//     const [results] = await connection.query(searchQuery, params);
//     connection.release();

//     console.log("Search results fetched successfully");
//     res.status(200).json(results);
//   } catch (err) {
//     console.error("Error fetching search results:", err);
//     res.status(500).json({ error: "Error fetching search results" });
//   }
// });

//Get Suggetions On search Bar
// app.get("/get-suggestions", async (req, res) => {
//   try {
//     const { query } = req.query;

//     const suggestionQuery = `
//       SELECT DISTINCT brand FROM users_ads WHERE
//       brand LIKE ?
//     `;

//     const params = [`%${query}%`];

//     const connection = await pool.getConnection();
//     const [results] = await connection.query(suggestionQuery, params);
//     connection.release();

//     const suggestions = results.map((result) => result.brand);

//     console.log("Suggestions fetched successfully");
//     res.status(200).json(suggestions);
//   } catch (err) {
//     console.error("Error fetching suggestions:", err);
//     res.status(500).json({ error: "Error fetching suggestions" });
//   }
// });

//ads by category

// Fetch Ads by Category
// app.get("/fetch-ads-by-category", async (req, res) => {
//   try {
//     const { page, limit, newUsedValue, category } = req.query; // Get category from query parameters

//     let query = "SELECT * FROM users_ads"; // Base query

//     const params = []; // Params array for SQL query

//     if (category) {
//       query += " WHERE main_category = ?";
//       params.push(category); // Add category to params
//     }

//     query += " AND status != 'pending_approval'"; // Exclude ads with status 'pending_approval'
//     query += " ORDER BY created_at DESC"; // Add sorting

//     const connection = await pool.getConnection();
//     const [results] = await connection.query(query, params);
//     connection.release();

//     console.log(
//       "Ads fetched successfully by category (excluding pending_approval)"
//     );
//     res.status(200).json(results);
//   } catch (err) {
//     console.error("Error fetching ads by category:", err);
//     res.status(500).json({ error: "Error fetching ads by category" });
//   }
// });

// Fetch Ads
// app.get("/fetch-ads", async (req, res) => {
//   try {
//     const {
//       page,
//       limit,
//       newUsedValue,
//       posterTypeValue,
//       sortByDate,
//       sortByPrice,
//     } = req.query;

//     let query =
//       "SELECT * FROM users_ads WHERE status <> 'pending_approval' ORDER BY created_at DESC"; // Exclude ads with status 'pending_approval'

//     // Add more conditions based on the provided query parameters (if needed)
//     // Example:
//     // if (newUsedValue) {
//     //   query += " AND new_used_column = ?";
//     // }

//     // Execute the query
//     const connection = await pool.getConnection();
//     const [results] = await connection.query(query);
//     connection.release();

//     console.log("Filtered Ads fetched successfully");
//     res.status(200).json(results);
//   } catch (err) {
//     console.error("Error fetching filtered ads:", err);
//     res.status(500).json({ error: "Error fetching filtered ads" });
//   }
// });

//admin approwal ads fetch

// Fetch Ads with Pending Approval Status
app.get("/approval", async (req, res) => {
  try {
    const query = "SELECT * FROM users_ads WHERE status = 'pending_approval'"; // Select ads with status 'pending_approval'

    // Execute the query
    const connection = await pool.getConnection();
    const [results] = await connection.query(query);
    connection.release();

    console.log("Pending Approval Ads fetched successfully");
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching pending approval ads:", err);
    res.status(500).json({ error: "Error fetching pending approval ads" });
  }
});

// DELETE route for deleting an ad by ID
app.delete("/delete/:id", async (req, res) => {
  const adId = req.params.id;

  try {
    const query = "DELETE FROM users_ads WHERE id = ?";

    // Execute the query with the adId parameter
    const connection = await pool.getConnection();
    const [result] = await connection.query(query, [adId]);
    connection.release();

    if (result.affectedRows === 0) {
      // If no rows were affected, the ad was not found
      res.status(404).json({ error: "Ad not found" });
    } else {
      // Delete successful
      console.log("Ad deleted successfully");
      res.status(200).json({ message: "Ad deleted successfully" });
    }
  } catch (err) {
    console.error("Error deleting ad:", err);
    res.status(500).json({ error: "Error deleting ad" });
  }
});





// DELETE route for deleting an ad by user
app.delete("/api/delect/:adId", async (req, res) => {
  const adId = req.params.adId; // Corrected from req.params.id

  try {
    const query = "DELETE FROM users_ads WHERE id = ?";

    // Execute the query with the adId parameter
    const connection = await pool.getConnection();
    const [result] = await connection.query(query, [adId]);
    connection.release();

    if (result.affectedRows === 0) {
      // If no rows were affected, the ad was not found
      res.status(404).json({ error: "Ad not found" });
    } else {
      // Delete successful
      console.log("Ad deleted successfully");
      res.status(200).json({ message: "Ad deleted successfully" });
    }
  } catch (err) {
    console.error("Error deleting ad:", err);
    res.status(500).json({ error: "Error deleting ad" });
  }
});


//Fetch Users
app.get("/api/all_users", async (req, res) => {
  try {
    const query = "SELECT * FROM reg";

    // Execute the query
    const connection = await pool.getConnection();
    const [results] = await connection.query(query);
    connection.release();

    console.log("Pending Approval Ads fetched successfully");
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching pending approval ads:", err);
    res.status(500).json({ error: "Error fetching pending approval ads" });
  }
});

// Route to handle ad approval
app.post("/approve/:adId", async (req, res) => {
  try {
    const adId = req.params.adId;

    // Update the ad's approval status in the database
    const query = 'UPDATE users_ads SET status = "approved" WHERE id = ?';

    // Execute the query
    const connection = await pool.getConnection();
    await connection.query(query, [adId]);
    connection.release();

    console.log(`Ad with ID ${adId} approved successfully`);
    res
      .status(200)
      .json({ message: `Ad with ID ${adId} approved successfully` });
  } catch (err) {
    console.error(`Error approving ad with ID ${adId}:`, err);
    res.status(500).json({ error: `Error approving ad with ID ${adId}` });
  }
});

// Handle image uploads
app.post("/upload-images", upload.array("selectedImages"), (req, res) => {
  const uploadedImageUrls = req.files.map((file) => {
    return `http://localhost:${PORT}/${file.path}`;
  });
  res.json(uploadedImageUrls);
});

// Register
app.post("/insertData", async (req, res) => {
  try {
    const { f_name, l_name, email, mobile_number, password } = req.body;

    // Check if the email already exists
    const emailCheckQuery = `
      SELECT COUNT(*) as count FROM reg WHERE email = ?
    `;

    const connection = await pool.getConnection();
    const [existingEmailRows] = await connection.query(emailCheckQuery, [email]);
    connection.release();

    const emailExists = existingEmailRows[0].count > 0;

    if (emailExists) {
      return res.status(400).json({ error: "Email already exists." });
    }

    // If email doesn't exist, insert the data
    const insertQuery = `
      INSERT INTO reg (f_name, l_name, email, mobile_number, password)
      VALUES (?, ?, ?, ?, ?)
    `;

    const insertConnection = await pool.getConnection();
    await insertConnection.query(insertQuery, [
      f_name,
      l_name,
      email,
      mobile_number,
      password,
    ]);
    insertConnection.release();

    console.log("Data inserted successfully.");
    return res.status(201).json({ message: "Data inserted successfully." });
  } catch (err) {
    console.error("Error inserting data:", err);
    return res.status(500).json({ error: "An error occurred while inserting data." });
  }
});


// Show Ads
app.get("/showAds", async (req, res) => {
  try {
    const query = "SELECT ad_tit, ad_des FROM ads"; // Select the desired columns

    const connection = await pool.getConnection();
    const [results] = await connection.query(query);
    connection.release();

    console.log("Data fetched successfully.");
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

// User Login
// Your login route
const jwt = require("jsonwebtoken");

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = "SELECT * FROM reg WHERE email = ?";
    const connection = await pool.getConnection();
    const [results] = await connection.query(query, [email]);
    connection.release();

    if (results.length > 0) {
      const user = results[0];
      const storedHashedPassword = user.password;

      if (storedHashedPassword === password) {
        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, secretKey, {
          expiresIn: "1h",
        });

        // Remove the password from the user object before sending it to the frontend
        delete user.password;

        res.status(200).json({ message: "Login successful", user, token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "An error occurred during login" });
  }
});

//Update User Details

app.put("/api/updateUser/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;

    // Check if any fields need to be updated
    if (!Object.keys(updatedUserData).length) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const fieldNames = Object.keys(updatedUserData);
    const fieldValues = Object.values(updatedUserData);

    // Construct the SET clause dynamically based on the fields provided
    const setClause = fieldNames
      .map((fieldName) => `${fieldName}=?`)
      .join(", ");

    // Update the user data in the 'reg' table
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      `UPDATE reg SET ${setClause} WHERE id=?`,
      [...fieldValues, userId]
    );
    connection.release();

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "User data updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});








//Delect User Account

app.delete("/api/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const connection = await pool.getConnection();
    const [result] = await connection.execute("DELETE FROM reg WHERE id = ?", [userId]);

    connection.release();

    if (result.affectedRows > 0) {
      res.status(200).json({ message: `User with ID ${userId} deleted successfully.` });
    } else {
      res.status(404).json({ message: `User with ID ${userId} not found.` });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




//Ads Fetch Only 3In 1//////////////

// Define an API endpoint for fetching user ads with pagination and filters
app.get('/fetch-adss', async (req, res) => {
  // Extract query parameters from the request
  const { page, limit, category, searchQuery, newUsedValue, dateValue, priceValue, categoryValue,searchQuery2 ,maim_location} = req.query;

  // Set the default sorting order to 'newest' if dateValue is not provided
  const defaultDateValue = 'newest';
  const effectiveDateValue = dateValue || defaultDateValue;

  // Construct the SQL query based on the filters and pagination
  let sql = 'SELECT * FROM users_ads WHERE status <> "pending_approval"'; // Exclude ads with status 'pending_approval'

  // Apply category filter if provided
  const params = []; // Create an array to hold query parameters

  if (category) {
    sql += ` AND main_category = ?`;
    params.push(category); // Push category to parameters array
  }

  if (categoryValue) {
    sql += ` AND main_category = ?`;
    params.push(categoryValue); // Push category to parameters array
  }

  // Apply search query filter if provided
  if (searchQuery) {
    sql += ` AND brand LIKE ?`;
    params.push(`%${searchQuery}%`); // Push searchQuery to parameters array
  }

  if(maim_location){
    sql +=' AND disthrick = ?';
    params.push(maim_location);
  }

  // Mini Search

  if (searchQuery2) {
    sql += ` AND brand LIKE ?`;
    params.push(`%${searchQuery2}%`); // Push searchQuery to parameters array
  }
  // Apply new/used filter if provided
  if (newUsedValue) {
    sql += ' AND `condition` = ?'; // Use backticks to escape the column name
    params.push(newUsedValue); // Push newUsedValue to parameters array
  }

  // Apply the date filter based on effectiveDateValue
  if (effectiveDateValue === 'newest') {
    sql += ' ORDER BY created_at DESC'; // Sort by newest first
  } else if (effectiveDateValue === 'oldest') {
    sql += ' ORDER BY created_at ASC'; // Sort by oldest first
  }

  if (priceValue === 'highToLow') {
    sql += ', price DESC'; // Add price sorting to the ORDER BY clause
  } else if (priceValue === 'lowToHigh') {
    sql += ', price ASC'; // Add price sorting to the ORDER BY clause
  }

  // Calculate the offset for pagination
  const offset = (page - 1) * limit;
  sql += ` LIMIT ? OFFSET ?`;

  params.push(parseInt(limit, 10)); // Push limit to parameters array
  params.push(offset); // Push offset to parameters array

  try {
    const connection = await pool.getConnection();
    const [results] = await connection.execute(sql, params); // Pass parameters array
    connection.release();

    res.json(results);
  } catch (err) {
    console.error('Error fetching filtered ads:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



//Keep Logging

// Hash Password Function (Using bcrypt)
const saltRounds = 10;

function hashPassword(password) {
  return bcrypt.hashSync(password, saltRounds);
}

function validatePassword(inputPassword, hashedPassword) {
  return bcrypt.compareSync(inputPassword, hashedPassword);
}
app.use((req, res, next) => {
  if (req.cookies.sessionID && !req.session.user) {
    req.sessionID = req.cookies.sessionID;
  }
  next();
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
