import { getAllEvents } from "../dao/events.dao.js";

export const getEventsRepository = () => {
    return getAllEvents();
};