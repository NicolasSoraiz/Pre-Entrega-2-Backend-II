import { getSessionsService } from "../services/sessions.service.js";

export const getSessions = (req, res) => {
    const sessions = getSessionsService();

    return res.status(200).json({
        status: "success",
        payload: sessions
    });

};