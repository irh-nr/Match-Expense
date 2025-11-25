import { Button } from "../ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center">
          <div>
            <Link href={"/"}>
              <h1 className="logo">
                M<span className="text-emerald-600">E</span>
              </h1>
            </Link>
          </div>
          <div className="space-x-2">
            <Button asChild variant={"ghost"}>
              <Link href="/register">Sign Up</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
