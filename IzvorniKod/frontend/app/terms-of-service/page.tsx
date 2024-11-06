import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <Image
            src="/logo-light.png"
            alt="GYM Progress Tracking Logo"
            width={300}
            height={300}
            className="mx-auto m-10"
          />
          <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
          <CardDescription>
            Please read these terms carefully before using our service
          </CardDescription>
        </CardHeader>
        <CardContent className="px-20 mt-6">
          <section className="py-10 border-t border-gray-200">
            <h2 className="text-2xl font-semibold mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the GYM Progress Tracking app, you agree to
              be bound by these Terms of Service and all applicable laws and
              regulations. If you do not agree with any part of these terms, you
              may not use our service.
            </p>
          </section>
          <section className="py-10 border-t border-gray-200">
            <h2 className="text-2xl font-semibold mb-2">2. Use of Service</h2>
            <p>
              You must be at least 18 years old to use this service. You are
              responsible for maintaining the confidentiality of your account
              and password. You agree to accept responsibility for all
              activities that occur under your account.
            </p>
          </section>
          <section className="py-10 border-t border-gray-200">
            <h2 className="text-2xl font-semibold mb-2">3. User Content</h2>
            <p>
              You retain all rights to any content you submit, post or display
              on or through the service. By posting content, you grant us a
              worldwide, non-exclusive, royalty-free license to use, reproduce,
              and distribute such content in connection with the service.
            </p>
          </section>
          <section className="py-10 border-t border-gray-200">
            <h2 className="text-2xl font-semibold mb-2">
              4. Prohibited Activities
            </h2>
            <p>
              You agree not to engage in any of the following prohibited
              activities: (1) copying, distributing, or disclosing any part of
              the service in any medium; (2) using any automated system to
              access the service; (3) transmitting spam, chain letters, or other
              unsolicited email; (4) attempting to interfere with or compromise
              the system integrity or security.
            </p>
          </section>
          <section className="py-10 border-t border-gray-200">
            <h2 className="text-2xl font-semibold mb-2">5. Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the
              service immediately, without prior notice or liability, under our
              sole discretion, for any reason whatsoever, including without
              limitation if you breach the Terms.
            </p>
          </section>
          <section className="py-10 border-t border-gray-200">
            <h2 className="text-2xl font-semibold mb-2">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time.
              It is your responsibility to check the Terms periodically for
              changes. Your continued use of the Service after we post any
              modifications to the Terms on this page will constitute your
              acknowledgment of the modifications and your consent to abide and
              be bound by the modified Terms.
            </p>
          </section>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
