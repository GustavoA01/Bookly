import { Card, CardContent, CardFooter } from '@/src/components/ui/card';
import { HaveAccount } from '@/src/features/Auth/components/HaveAccount';
import { AuthHeader } from '@/src/features/Auth/components/AuthHeader';
import { SignUpForm } from '@/src/features/Auth/container/SignUpForm';

const SignUpPage = () => (
  <Card className="max-w-lg w-full">
    <AuthHeader
      title="Crie sua conta"
      description="Junte-se ao Bookly e organize suas leituras."
    />

    <CardContent>
      <SignUpForm />
      <CardFooter className="flex flex-col">
        <HaveAccount
          label="Já tem uma conta?"
          labelAction="Entrar"
          labelHref="/login"
        />
      </CardFooter>
    </CardContent>
  </Card>
);

export default SignUpPage;
