import { Card, CardContent, CardFooter } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { HaveAccount } from '@/src/features/Auth/components/HaveAccount';
import { AuthHeader } from '@/src/features/Auth/components/AuthHeader';
import { LogInForm } from '@/src/features/Auth/container/LogInForm';

const LogInPage = () => {
  return (
    <Card className="max-w-lg w-full">
      <AuthHeader title="Bem-vindo de volta!" description="Faça login para acessar sua biblioteca." />

      <CardContent>
        <LogInForm />

        <div className="text-center my-4">
          <p className="text-muted-foreground text-sm">Ou continue com</p>
        </div>

        <Button variant="outline" className="w-full">
          Google
        </Button>
        <CardFooter className="flex flex-col">
          <HaveAccount label="Não tem uma conta?" labelAction="Cadastre-se" labelHref="/signup" />
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default LogInPage;
