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
          <div className="flex flex-1 h-[calc(100vh-60px)]">
            <div className="hidden xl:block">
              <Navigation orientation="vertical" />
            </div>
            <main className="flex-1 overflow-y-auto max-xl:pb-[60px]">
              {children}
            </main>
          </div>
          <div className="xl:hidden fixed bottom-0 w-full">
            <Navigation orientation="horizontal" />
          </div>
        </div>
      </AppProvider>
    </AuthProvider>
  );
}
