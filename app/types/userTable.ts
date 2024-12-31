// src/types/userTable.ts
interface UserTableType {
    id: number;
    user: {
      mail: string;
    };
    created_at: string;
    balance: string;
  }


export default UserTableType;