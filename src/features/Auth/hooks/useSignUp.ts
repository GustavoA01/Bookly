import { SignUpFormType, signUpSchema } from '@/src/data/schemas';
import { auth } from '@/src/services/firebase/firebaseConfig';
import { zodResolver } from '@hookform/resolvers/zod';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

export const useSignUp = () => {
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignUp = async (data: SignUpFormType) => {
    startTransition(async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        const user = userCredential.user;
        if (user) await updateProfile(user, { displayName: data.name });

        push('/');
      } catch (error) {
        const authError = error as FirebaseError;
        const errorCode = authError.code;
        const errorMessage = authError.message;

        console.error('Erro ao criar usuário:', errorCode, errorMessage);
        setErrorMessage(errorMessage);

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    });
  };

  return { methods, handleSignUp, isPending, errorMessage };
};
