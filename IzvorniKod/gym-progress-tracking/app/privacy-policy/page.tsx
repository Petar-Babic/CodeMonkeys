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

export default function PrivacyPolicyPage() {
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
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          <CardDescription>
            Learn how we collect, use, and protect your personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="px-20 mt-6">
          <section className="py-10 border-t border-gray-200 ">
            <h2 className="text-2xl font-semibold mb-2">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us, such as when
              you create an account, update your profile, or use certain
              features of our service. This may include your name, email
              address, password, age, gender, height, weight, and fitness goals.
            </p>
          </section>
          <section className="py-10 border-t border-gray-200 ">
            <h2 className="text-2xl font-semibold mb-2">
              2. How We Use Your Information
            </h2>
            <p>
              We use the information we collect to provide, maintain, and
              improve our services, to develop new ones, and to protect our
              company and our users. We also use the information to communicate
              with you, to customize your experience, and to carry out any other
              purpose for which the information was collected.
            </p>
          </section>
          <section className="py-10 border-t border-gray-200 ">
            <h2 className="text-2xl font-semibold mb-2">
              3. Information Sharing and Disclosure
            </h2>
            <p>
              We may share information about you as follows: (1) with vendors,
              consultants, and other service providers who need access to such
              information to carry out work on our behalf; (2) in response to a
              request for information if we believe disclosure is in accordance
              with any applicable law, regulation, or legal process; (3) if we
              believe your actions are inconsistent with the spirit or language
              of our user agreements or policies.
            </p>
          </section>
          <section className="py-10 border-t border-gray-200 ">
            <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
            <p>
              We take reasonable measures to help protect information about you
              from loss, theft, misuse and unauthorized access, disclosure,
              alteration and destruction. However, no internet or email
              transmission is ever fully secure or error-free.
            </p>
          </section>
          <section className="py-10 border-t border-gray-200 ">
            <h2 className="text-2xl font-semibold mb-2">5. Your Choices</h2>
            <p>
              You may update, correct, or delete information about you at any
              time by logging into your online account. If you wish to delete or
              deactivate your account, please email us, but note that we may
              retain certain information as required by law or for legitimate
              business purposes.
            </p>
          </section>
          <section className="py-10 border-t border-gray-200 ">
            <h2 className="text-2xl font-semibold mb-2">
              6. Changes to this Policy
            </h2>
            <p>
              We may change this privacy policy from time to time. If we make
              changes, we will notify you by revising the date at the top of the
              policy and, in some cases, we may provide you with additional
              notice.
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
