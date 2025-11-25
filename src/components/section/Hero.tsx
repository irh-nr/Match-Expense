"use client";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div>
      <section
        id="hero"
        className="container relative flex flex-col space-y-6 justify-center items-center min-h-screen"
      >
        <div className="text-center">
          <h1>
            Welcome to{" "}
            <>
              Match <span className="text-emerald-600">Expense</span>
            </>
          </h1>
          <p className="text-lead">Your daily budgeting apps.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard">
            Get Started <ArrowRight />
          </Link>
        </Button>
      </section>
    </div>
  );
}
