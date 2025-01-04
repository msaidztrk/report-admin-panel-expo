import { makeApiRequest } from "./apiHelpers";
import { Routes } from "../types/routes";

// prettier-ignore
export const createNewUser = async (name: string, email: string, password: string): Promise<void> => 
    await makeApiRequest("post", "/users/new", { name, email, password }, "User created successfully!", Routes.HOME);

// prettier-ignore
export const fetchUserData = async (id: any): Promise<void> => 
    await makeApiRequest("get", `/users/fetch?id=${id}`);

// prettier-ignore
export const updateUserData = async (id: any, name: string, email: string, password: string): Promise<void> =>
     await makeApiRequest("post", "/users/update", { id, name, email, password }, "User updated successfully!", Routes.HOME);

