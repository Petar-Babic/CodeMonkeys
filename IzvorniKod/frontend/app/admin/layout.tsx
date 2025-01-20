import { Suspense } from "react";
import AppLayoutComponent from "@/components/AppLayoutComponent";
import LoadingAppScreen from "@/components/LoadingAppScreen";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userId = session.user.id;
  const accessToken = session.accessToken;
  const refreshToken = session.refreshToken;

  return (
    <Suspense fallback={<LoadingAppScreen />}>
      <AppLayoutComponent
        userId={Number(userId)}
        accessToken={accessToken ?? ""}
        refreshToken={refreshToken ?? ""}
      >
        {children}
      </AppLayoutComponent>
    </Suspense>
  );
}
