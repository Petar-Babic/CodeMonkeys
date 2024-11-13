import { Suspense } from "react";
import AppLayoutComponent from "@/components/AppLayoutComponent";
import LoadingAppScreen from "@/components/LoadingAppScreen";
import { getServerSession } from "next-auth";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  const userId = session?.user.id;

  if (!session) {
    // Redirect to login or show an error
    return <div>Please log in to access this page.</div>;
  }

  return (
    <Suspense fallback={<LoadingAppScreen />}>
      <AppLayoutComponent userId={userId ?? ""}>{children}</AppLayoutComponent>
    </Suspense>
  );
}
