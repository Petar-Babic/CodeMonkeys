import { UserBase } from "./user";

// Session Types
export type SessionBase = {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
};

export type SessionWithRelations = SessionBase & {
  user: UserBase;
};

export type CreateSessionInput = Omit<SessionBase, "id">;

export type UpdateSessionInput = Partial<Omit<SessionBase, "id" | "userId">>;

// Additional types that might be useful for session management
export type SessionInfo = {
  userId: string;
  username: string;
  email: string;
  role: string;
  expiresAt: number;
};

export type SessionStatus = "active" | "expired" | "revoked";

export type SessionWithStatus = SessionBase & {
  status: SessionStatus;
};

// Type for session token
export type SessionToken = string;

// Type for session options
export type SessionOptions = {
  maxAge: number;
  secure: boolean;
  sameSite: "strict" | "lax" | "none";
};

// Type for session store methods
export interface SessionStore {
  get: (sessionToken: SessionToken) => Promise<SessionInfo | null>;
  set: (sessionToken: SessionToken, session: SessionInfo) => Promise<void>;
  destroy: (sessionToken: SessionToken) => Promise<void>;
}

// Type for session middleware configuration
export type SessionMiddlewareConfig = {
  cookieName: string;
  cookieOptions: SessionOptions;
  store: SessionStore;
};
