"use client";
import { Input } from "@/src/components/ui/input";
import { EmailPass } from "../components/EmailPass";
import { Label } from "@/src/components/ui/label";
import { useForm } from "react-hook-form";
import { SignUpFormType, signUpSchema } from "@/src/data/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export const SignUpForm = () => {
  const { register, handleSubmit } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignUp = (data: SignUpFormType) => {
    console.log(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
      <div className="space-y-2">
        <Label>NOME</Label>
        <Input placeholder="Seu nome" {...register("name")} />
      </div>
      <EmailPass
        register={register}
        pathPasswordRecovery="/password-recovery"
        actionLabel="Criar Conta"
        action={() => {}}
      />
    </form>
  );
};
