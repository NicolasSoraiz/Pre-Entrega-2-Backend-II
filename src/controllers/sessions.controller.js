import { registerUser, loginUser } from "../services/sessions.service.js";

export const register = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({
            status: "success",
            payload: {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const { token } = await loginUser(
            email,
            password
        );

        res.cookie("currentUser", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 3600000,
            secure: process.env.NODE_ENV === "production"
        });

        res.status(200).json({
            status: "success",
            message: "Login correcto"
        });

    } catch (error) {
        next(error);
    }
};

export const current = (req, res) => {
    res.status(200).json({
        status: "success",
        payload: {
            id: req.user.id,
            email: req.user.email,
            role: req.user.role
        }
    });
};

export const logout = (req, res) => {
    res.clearCookie("currentUser", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    });

    res.status(200).json({
        status: "success",
        message: "Sesión cerrada"
    });
};