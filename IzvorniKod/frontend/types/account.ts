export type AccountBase = {
  id: number;
  userId: number;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
};

export type CreateAccountInput = Omit<AccountBase, "id">;

export type UpdateAccountInput = Partial<
  Omit<AccountBase, "id" | "userId" | "type" | "provider" | "providerAccountId">
>;
