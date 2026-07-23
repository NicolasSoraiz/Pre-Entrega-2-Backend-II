import { getUserByEmail, saveUser } from "../repositories/users.repository.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async ({
    first_name,
    last_name,
    email,
    password
}) => {

    if (!first_name || !last_name || !email || !password) {
        const error = new Error("Faltan campos obligatorios");
        error.statusCode = 400;
        throw error;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
        const error = new Error("El formato del email no es válido");
        error.statusCode = 400;
        throw error;
    }

    if (password.length < 6) {
        const error = new Error(
            "La contraseña debe tener al menos 6 caracteres"
        );
        error.statusCode = 400;
        throw error;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await getUserByEmail(normalizedEmail);

    if (existingUser) {
        const error = new Error("El email ya está registrado");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await saveUser({
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        email: normalizedEmail,
        password: hashedPassword
    });

    return newUser;
};

export const loginUser = async (email, password) => {
    if (!email || !password) {
        const error = new Error("Credenciales inválidas");
        error.statusCode = 401;
        throw error;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await getUserByEmail(normalizedEmail);

    if (!user) {
        const error = new Error("Credenciales inválidas");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordValid = await comparePassword(
        password,
        user.password
    );

    if (!isPasswordValid) {
        const error = new Error("Credenciales inválidas");
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken(user);

    return {
        token
    };
};