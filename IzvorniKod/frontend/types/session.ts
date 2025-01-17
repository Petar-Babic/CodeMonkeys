import { UserBase } from "./user";

// Session Types
export type SessionBase = {
  id: string;
  accessToken?: string;
  userId: string;
  refreshToken?: string;
  expires: Date;
};

export type SessionWithRelations = SessionBase & {
  user: UserBase;
};

export type CreateSessionInput = Omit<SessionBase, "id">;

export type UpdateSessionInput = Partial<Omit<SessionBase, "userId">> & {
  id: string;
};
