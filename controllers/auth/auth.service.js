const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
    path: path.resolve(__dirname, "../../config/development.env"),
});

const {
    ConflictException,
    NotFoundException,
    UnauthorizedException,
} = require("../../utility/custom-error");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const process = require("process");
class AuthService {
    /**
     * [@Description: Register a new user
     * @param {CreateUserDto} createUserDto - Data Transfer Object containing user registration details.
     * @returns {Promise<{ message: string, data: User }>} - Response object
     * @author: Krutik Shukla
     **/
    async registerUser(createUserDto) {
        try {
            const {
                email,
                password,
                firstName,
                lastName,
                phoneNumber,
                address,
            } = createUserDto;

            /* Check if user already exists */
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                throw new ConflictException("Email address already exists");
            }

            /* Hash the password */
            const hashedPassword = await bcrypt.hash(password, 10);

            /* Create the user */
            const user = await User.create({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                phoneNumber,
                address,
            });

            return user;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find a user by their email
     * @param {string} email - The email of the user to find.
     * @returns {Promise<User>} - The user found with the given email, or undefined if no user is found.
     */
    async findUserByEmail(email) {
        try {
            const user = await User.findOne({
                where: { email, isActive: true, isDeleted: false },
            });
            if (!user) {
                throw new NotFoundException(
                    "Please enter required email address."
                );
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find a user by their id
     * @param {number} userId - The id of the user to find.
     * @returns {Promise<User>} - The user found with the given id, or undefined if no user is found.
     */
    async findUserById(userId) {
        try {
            const user = await User.findOne({
                where: { id: userId, isActive: true, isDeleted: false },
            });
            if (!user) {
                throw new NotFoundException("ERR_USER_NOT_FOUND");
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Log in a user and return a JWT token
     * @param {LoginDto} loginDto - Data Transfer Object containing login details.
     * @returns {Promise<{ message: string, data: { accessToken: string } }>} - The JWT access token with a success message.
     * @author: Krutik Shukla
     */
    async login(loginDto) {
        try {
            const { email, password } = loginDto;

            // Find the user by email
            const user = await User.findOne({ where: { email } });

            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new UnauthorizedException("Invalid email or password");
            }

            // Generate JWT (Assuming you have a function for generating tokens)
            const token = this.generateJwtToken(user); // implement generateJwtToken separately

            return { user, token };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generate JWT token with a 1-day expiration
     * @param {User} user - The user object containing id, email, and isActive status.
     * @returns {string} - The generated JWT token.
     * @author: krutik Shukla
     */
    generateJwtToken(user) {
        return jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET, // Ensure this is set in your environment
            { expiresIn: "1d" }
        );
    }
}

module.exports = new AuthService();
