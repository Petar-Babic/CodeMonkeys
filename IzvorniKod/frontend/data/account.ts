import { AccountBase } from "@/types/account";

export const accounts: AccountBase[] = [
  {
    id: 1,
    userId: 1,
    type: "oauth",
    provider: "google",
    providerAccountId: "google123",
    refresh_token: "refresh_token_1",
    access_token: "access_token_1",
    expires_at: 1672531199, // December 31, 2023, 23:59:59 UTC
    token_type: "Bearer",
    scope: "openid profile email",
    id_token: "id_token_1",
    session_state: "session_state_1",
  },
  {
    id: 2,
    userId: 2,
    type: "oauth",
    provider: "facebook",
    providerAccountId: "facebook456",
    refresh_token: "refresh_token_2",
    access_token: "access_token_2",
    expires_at: 1672531199, // December 31, 2023, 23:59:59 UTC
    token_type: "Bearer",
    scope: "public_profile,email",
    id_token: null,
    session_state: null,
  },
  {
    id: 3,
    userId: 3,
    type: "oauth",
    provider: "apple",
    providerAccountId: "apple789",
    refresh_token: "refresh_token_3",
    access_token: "access_token_3",
    expires_at: 1672531199, // December 31, 2023, 23:59:59 UTC
    token_type: "Bearer",
    scope: "name email",
    id_token: "id_token_3",
    session_state: null,
  },
  {
    id: 4,
    userId: 4,
    type: "oauth",
    provider: "google",
    providerAccountId: "google321",
    refresh_token: "refresh_token_4",
    access_token: "access_token_4",
    expires_at: 1672531199, // December 31, 2023, 23:59:59 UTC
    token_type: "Bearer",
    scope: "openid profile email",
    id_token: "id_token_4",
    session_state: "session_state_4",
  },
  {
    id: 5,
    userId: 5,
    type: "oauth",
    provider: "github",
    providerAccountId: "github654",
    refresh_token: "refresh_token_5",
    access_token: "access_token_5",
    expires_at: 1672531199, // December 31, 2023, 23:59:59 UTC
    token_type: "Bearer",
    scope: "user,repo",
    id_token: null,
    session_state: null,
  },
];
