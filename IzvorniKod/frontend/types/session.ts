import { UserBase } from "./user";

// Session Types
export type SessionBase = {
  id: number;
  accessToken?: string;
  userId: number;
  refreshToken?: string;
  expires: Date;
  users?: {
    userId: number;
    name: string;
    image: string;
  }[];
};

export type SessionWithRelations = SessionBase & {
  user: UserBase;
};

export type CreateSessionInput = Omit<SessionBase, "id">;

export type UpdateSessionInput = Partial<Omit<SessionBase, "userId">> & {
  id: number;
};
