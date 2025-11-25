import LoginForm from "@/app/(auth)/login/component/login-form";

export default function Login() {
  return (
    <div className="auth-form">
      <div className="rounded-2xl border-4 px-12 py-2 w-full">
        <LoginForm />
      </div>
    </div>
  );
}
