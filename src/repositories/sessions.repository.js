import { getAllSessions } from "../dao/sessions.dao.js";

export const getSessionsRepository = () => {
    return getAllSessions();
};