import RegisterForm from "@/app/(auth)/register/component/register-form";

export default function Register() {
  return (
    <div className="auth-form">
      <div className="rounded-2xl border-4 px-12 py-2 w-full">
        <RegisterForm />
      </div>
    </div>
  );
}
