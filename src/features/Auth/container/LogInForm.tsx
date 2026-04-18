'use client';
import { EmailPass } from '../components/EmailPass';
import { FormErrorMessage } from '@/src/components/FormErrorMessage';
import { useSignIn } from '../hooks/useSignIn';

export const LogInForm = () => {
  const {
    methods: { handleSubmit, register },
    handleSignIn,
    isPending,
    errorMessage,
    handleResetPassword,
  } = useSignIn();

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
      <EmailPass
        register={register}
        labelPasswordRecovery="Esqueceu a senha?"
        labelAction="Recuperar"
        pathPasswordRecovery={handleResetPassword}
        actionLabel="Entrar"
        isPending={isPending}
        nameEmail="email"
        namePassword="password"
      />
      <FormErrorMessage showMessage={!!errorMessage} message={errorMessage} />
    </form>
  );
};
