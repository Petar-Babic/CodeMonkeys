// @/app/(auth)/layout.tsx
import { AuthProvider } from "@/contexts/AuthContext";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthProvider>{children}</AuthProvider>;
}
