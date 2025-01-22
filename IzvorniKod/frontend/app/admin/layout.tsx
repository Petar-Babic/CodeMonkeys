import { Suspense } from "react";
import LoadingAppScreen from "@/components/LoadingAppScreen";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import AdminAppLayoutComponent from "@/components/AdminAppLayoutComponent";

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

  session.user.role = "ADMIN";

  return (
    <Suspense fallback={<LoadingAppScreen />}>
      <AdminAppLayoutComponent
        userId={Number(userId)}
        accessToken={accessToken ?? ""}
      >
        {children}
      </AdminAppLayoutComponent>
    </Suspense>
  );
}
