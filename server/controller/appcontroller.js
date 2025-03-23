import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Company from "../model/company.model.js";
import det from '../model/details.model.js';
import UserModel from '../model/user.model.js';
import ENV from '../router/config.js';
/** POST: http://localhost:8080/api/register
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/


/** middleware for verify user */

export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;

        // Check if the username already exists
        const existingUsername = await UserModel.findOne({ username });
        if (existingUsername) {
            return res.status(400).send({ error: "Please use a unique username" });
        }

        // Check if the email already exists
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).send({ error: "Please use a unique email" });
        }

        // Hash the password
        if (!password) {
            return res.status(400).send({ error: "Password is required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new UserModel({
            username,
            password: hashedPassword,
            profile: profile || '',
            email,
        });

        // Save the user to the database
        await user.save();

        return res.status(201).send({ msg: "User registered successfully" });
    } catch (error) {
        return res.status(500).send({ error: error.message || "Internal Server Error" });
    }
}

/** GET: http://localhost:8080/api/user/example123 */
export async function login(req, res) {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).send({ error: "Username not Found" });
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400).send({ error: "Incorrect Password" });
        } 

        // Create JWT token
        const token = jwt.sign({
            userId: user._id,
            username: user.username
        }, ENV.jwt_secret, { expiresIn: "24h" });

        return res.status(200).send({
            msg: "Login Successful!",
            username: user.username,
            token
        });
    } catch (error) {
        return res.status(500).send({ error });
    }
}





export async function Infodetails(req, res) {
    
        try {
            const {  firstName, surName, phone, otherName, country, region, city, degree, email } = req.body;

            // Validate required fields
            if ( !firstName || !surName || !phone || !email || !degree) {
                return res.status(400).json({ error: "Required fields are missing" });
            }

            // Check if email already exists
            const existingUser = await det.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "Email already exists" });
            }

            // Create and save the new user
            const newUser = new det({  firstName, surName, phone, otherName, country, region, city, degree, email });
            await newUser.save();

            return res.status(201).json({ message: "User data stored successfully", data: newUser });
        } catch (error) {
            return res.status(500).json({ error: "Server error", details: error.message });
        }
    }

    export async function CompanyDetails(req, res)  {
        try {
          const newCompany = new Company(req.body);
          await newCompany.save();
          res.status(201).json(newCompany);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }
      ;

