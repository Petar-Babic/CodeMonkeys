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

  const userId = session?.user.id;
  const accessToken = session?.accessToken;

  if (!session) {
    // Redirect to login or show an error
    return <div>Please log in to access this page.</div>;
  }

  return (
    <Suspense fallback={<LoadingAppScreen />}>
      <AppLayoutComponent userId={userId ?? ""} accessToken={accessToken ?? ""}>
        {children}
      </AppLayoutComponent>
    </Suspense>
  );
}
