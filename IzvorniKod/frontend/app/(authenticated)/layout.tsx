import { Suspense } from "react";
import AppLayoutComponent from "@/components/AppLayoutComponent";
import { getSession } from "next-auth/react";
import LoadingAppScreen from "@/components/LoadingAppScreen";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (!session) {
    // Redirect to login or show an error
    return <div>Please log in to access this page.</div>;
  }

  return (
    <Suspense fallback={<LoadingAppScreen />}>
      <AppLayoutComponent userId={session.userId}>
        {children}
      </AppLayoutComponent>
    </Suspense>
  );
}
