import { Suspense } from "react";
import Loading from "./loading";
import AppLayoutComponent from "@/components/AppLayout";
import { getSession } from "next-auth/react";

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
    <Suspense fallback={<Loading />}>
      <AppLayoutComponent userId={session.userId}>
        {children}
      </AppLayoutComponent>
    </Suspense>
  );
}
