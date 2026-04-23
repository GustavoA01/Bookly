import { SignInFormType, signInSchema } from '@/src/data/schemas';
import { auth } from '@/src/services/firebase/firebaseConfig';
import { zodResolver } from '@hookform/resolvers/zod';
import { FirebaseError } from 'firebase/app';
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const useSignIn = () => {
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
  });

  const handleResetPassword = async () => {
    const email = methods.getValues('email');
    if (!email) {
      toast.error('Por favor, insira seu e-mail para recuperação de senha.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(
        'E-mail de recuperação enviado! Verifique sua caixa de entrada.'
      );
    } catch (err) {
      const error = err as FirebaseError;

      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error('Erro ao enviar e-mail de recuperação');
      console.error('Erro ao enviar e-mail:', errorCode, errorMessage);
    }
  };

  const handleSignIn = async (data: SignInFormType) => {
    startTransition(async () => {
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        push('/');
      } catch (error) {
        const signInError = error as FirebaseError;
        const errorCode = signInError.code;
        const errorMessage = signInError.message;

        console.error('Erro ao fazer login:', errorCode, errorMessage);
        setErrorMessage(errorMessage);

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    });
  };

  return {
    methods,
    handleSignIn,
    isPending,
    errorMessage,
    handleResetPassword,
  };
};
