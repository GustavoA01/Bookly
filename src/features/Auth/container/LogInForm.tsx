"use client";
import { EmailPass } from "../components/EmailPass";

export const LogInForm = () => {
  return (
    <form className="space-y-4">
      <EmailPass
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
