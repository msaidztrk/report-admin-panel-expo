// src/types/userTable.ts
export interface UserTableType {
    id: number;
    user: {
      mail: string;
    };
    created_at: string;
    balance: string;
  }