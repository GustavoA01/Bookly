import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { toast } from 'sonner';
import { PasswordFormType, passwordSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/src/data/contexts/AuthProvider';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';

const getErrorMessage = {
  'auth/wrong-password': 'Senha atual incorreta.',
  'auth/weak-password': 'A nova senha é muito fraca. Use pelo menos 6 caracteres.',
  'auth/requires-recent-login': 'Por segurança, faça login novamente e tente outra vez.',
  default: 'Não foi possível alterar a senha. Tente novamente.',
};

export const usePasswordForm = () => {
  const { user } = useAuth();
  const [isChanging, setIsChanging] = useState(false);
  const methods = useForm<PasswordFormType>({
    resolver: zodResolver(passwordSchema),
  });

  const handleChangePassword = async (data: PasswordFormType) => {
    if (user) {
      const credential = EmailAuthProvider.credential(user.email!, data.previousPassword);

      try {
        setIsChanging(true);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, data.password);
        toast.success('Senha alterada');
      } catch (err) {
        const error = err as FirebaseError;
        console.error('Error changing password:', error);
        const message = getErrorMessage[error.code as keyof typeof getErrorMessage] || getErrorMessage.default;
        toast.error(message);
      } finally {
        setIsChanging(false);
      }
    }
  };

  return {
    handleChangePassword,
    handleSubmit: methods.handleSubmit,
    register: methods.register,
    errorPassMessage: methods.formState.errors.password?.message,
    errorPreviousPassMessage: methods.formState.errors.previousPassword?.message,
    isChanging,
  };
};
