import { Suspense } from "react";
import AppLayoutComponent from "@/components/AppLayoutComponent";
import LoadingAppScreen from "@/components/LoadingAppScreen";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  console.log("session at layout", session);

  const userId = session?.user.id;
  const accessToken = session?.accessToken;
  const refreshToken = session?.refreshToken;

  console.log("/app/(authenticated)/layout refreshToken", refreshToken);
  console.log("/app/(authenticated)/layout accessToken", accessToken);

  if (!session) {
    // Redirect to login or show an error
    return <div>Please log in to access this page.</div>;
  }

  return (
    <Suspense fallback={<LoadingAppScreen />}>
      <AppLayoutComponent
        userId={Number(userId)}
        accessToken={accessToken ?? ""}
        session={session}
      >
        {children}
      </AppLayoutComponent>
    </Suspense>
  );
}
