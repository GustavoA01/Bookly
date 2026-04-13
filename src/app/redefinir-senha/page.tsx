'use client';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Button } from '@/src/components/ui/button';
import { AuthHeader } from '@/src/features/Auth/components/AuthHeader';
import { useResetPassword } from '@/src/hooks/useResetPassword';

const ResetPasswordPage = () => {
  const {
    email,
    handleSubmit,
    isError,
    isValidating,
    onSubmit,
    register,
    push,
  } = useResetPassword();

  if (isValidating)
    return <p className="text-center animate-pulse">Validando link...</p>;

  if (isError) {
    return (
      <Card className="max-w-lg w-full p-6 text-center">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Link Inválido</CardTitle>
          <CardDescription className="text-muted-foreground">
            Este link de recuperação expirou ou já foi utilizado.
          </CardDescription>
        </CardHeader>
        <Button onClick={() => push('/login')} className="mt-4">
          Voltar ao Login
        </Button>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg w-full p-6">
      <AuthHeader
        title="Redefinir Senha"
        description={`Nova senha para: ${email}`}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label>NOVA SENHA</Label>
          <Input
            type="password"
            placeholder="********"
            {...register('password', { required: true, minLength: 6 })}
          />
        </div>
        <Button type="submit" className="w-full">
          Atualizar Senha
        </Button>
      </form>
    </Card>
  );
};

export default ResetPasswordPage;
