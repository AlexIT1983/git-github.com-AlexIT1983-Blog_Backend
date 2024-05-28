// Наш асинхронный экшен для удаления post

import { request } from "../utils/request";

export const removePostAsync = (id) => () => request(`/posts/${id}`, "DELETE");
