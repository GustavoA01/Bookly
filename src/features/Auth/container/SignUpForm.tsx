"use client";
import { Input } from "@/src/components/ui/input";
import { EmailPass } from "../components/EmailPass";
import { Label } from "@/src/components/ui/label";

export const SignUpForm = () => {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label>NOME</Label>
        <Input placeholder="Seu nome" />
      </div>
      <EmailPass
        pathPasswordRecovery="/password-recovery"
        actionLabel="Criar Conta"
        action={() => {}}
      />
    </form>
  );
};
