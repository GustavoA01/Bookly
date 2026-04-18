'use client';
import { Input } from '@/src/components/ui/input';
import { EmailPass } from '../components/EmailPass';
import { Label } from '@/src/components/ui/label';
import { FormErrorMessage } from '@/src/components/FormErrorMessage';
import { useSignUp } from '../hooks/useSignUp';

export const SignUpForm = () => {
  const {
    methods: { handleSubmit, register },
    isPending,
    errorMessage,
    handleSignUp,
  } = useSignUp();

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
      <div className="space-y-2">
        <Label>NOME</Label>
        <Input placeholder="Seu nome" {...register('name')} />
      </div>
      <EmailPass
        register={register}
        actionLabel="Criar Conta"
        isPending={isPending}
        nameEmail="email"
        namePassword="password"
      />
      <FormErrorMessage showMessage={!!errorMessage} message={errorMessage} />
    </form>
  );
};
