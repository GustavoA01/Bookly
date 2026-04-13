import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../services/firebase/firebaseConfig';
import { FirebaseError } from 'firebase/app';
import { toast } from 'sonner';

export const useResetPassword = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get('oobCode');
  const methods = useForm<{ password: string }>();

  const [email, setEmail] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const validatePassword = async () => {
      if (!oobCode) {
        setIsError(true);
        setIsValidating(false);
        return;
      }

      try {
        await verifyPasswordResetCode(auth, oobCode);
        setEmail(email);
        setIsValidating(false);
      } catch (err) {
        const error = err as FirebaseError;
        setIsError(true);
        setIsValidating(false);
        console.log(error.code, error.message);
      }
    };

    validatePassword();
  }, [email, oobCode]);

  const onSubmit = async (data: { password: string }) => {
    if (!oobCode) return;

    try {
      await confirmPasswordReset(auth, oobCode, data.password);
      toast.success('Senha alterada com sucesso!');
      push('/login');
    } catch (error) {
      toast.error('Erro ao redefinir senha. O link pode ter expirado.');
      console.error(
        'Erro ao redefinir senha:',
        (error as FirebaseError).message
      );
    }
  };

  return {
    email,
    isValidating,
    isError,
    onSubmit,
    push,
    register: methods.register,
    handleSubmit: methods.handleSubmit,
  };
};
