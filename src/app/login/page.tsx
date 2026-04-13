import { Card, CardContent, CardFooter } from '@/src/components/ui/card';
import { HaveAccount } from '@/src/features/Auth/components/HaveAccount';
import { AuthHeader } from '@/src/features/Auth/components/AuthHeader';
import { LogInForm } from '@/src/features/Auth/container/LogInForm';

const LogInPage = () => (
  <Card className="max-w-lg w-full">
    <AuthHeader
      title="Bem-vindo de volta!"
      description="Faça login para acessar sua biblioteca."
    />

    <CardContent>
      <LogInForm />
      <CardFooter className="flex flex-col">
        <HaveAccount
          label="Não tem uma conta?"
          labelAction="Cadastre-se"
          labelHref="/signup"
        />
      </CardFooter>
    </CardContent>
  </Card>
);

export default LogInPage;
