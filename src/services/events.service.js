import { getEventsRepository } from "../repositories/events.repository.js";

export const getEventsService = () => {
    return getEventsRepository();
};