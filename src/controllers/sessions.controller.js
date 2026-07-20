import { registerUser } from "../services/sessions.service.js";

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