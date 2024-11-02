// @app/app/layout.tsx
import { AppProvider } from "@/contexts/AppContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import LoadingAppScreen from "@/components/LoadingAppScreen";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <AppProvider>
        <LoadingAppScreen />
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-1 h-[calc(100vh-2.75rem)]">
            <div className="hidden xl:block">
              <Navigation orientation="vertical" />
            </div>
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
          <div className="xl:hidden">
            <Navigation orientation="horizontal" />
          </div>
        </div>
      </AppProvider>
    </AuthProvider>
  );
}
