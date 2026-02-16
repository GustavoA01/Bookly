"use client";
import { useForm } from "react-hook-form";
import { EmailPass } from "../components/EmailPass";
import { SignInFormType, signInSchema } from "@/src/data/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export const LogInForm = () => {
  const { register, handleSubmit } = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
  });

  const handleSignIn = (data: SignInFormType) => {
    console.log(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
      <EmailPass
        register={register}
        labelPasswordRecovery="Esqueceu a senha?"
        labelAction="Recuperar"
        pathPasswordRecovery="/password-recovery"
        actionLabel="Entrar"
        action={() => {}}
        showRecovery
      />
    </form>
  );
};
