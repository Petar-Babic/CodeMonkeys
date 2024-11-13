import React from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function ErrorAuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <AlertCircle className="mr-2" />
            Authentication Error
          </CardTitle>
          <CardDescription>
            There was a problem with your authentication.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            This could be due to an expired session, invalid credentials, or
            lack of permissions. Please try signing in again or contact support
            if the problem persists.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
