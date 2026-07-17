import { getSessionsRepository } from "../repositories/sessions.repository.js";

export const getSessionsService = () => {
    return getSessionsRepository();
};