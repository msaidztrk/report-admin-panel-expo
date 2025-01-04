import { makeApiRequest } from "./apiHelpers";
import { Routes } from "../types/routes";
 

export const addBalance = async (userId : any , addingBalance : any): Promise<void> => 
    await makeApiRequest("post", "/balance/update", { userId, addingBalance }, "Balance Updated", undefined);
