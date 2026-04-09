import { updateProfile } from 'firebase/auth';
import { toast } from 'sonner';
import { NameFormType, nameSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/src/data/contexts/AuthProvider';

export const useNameForm = () => {
  const { user } = useAuth();
  const methods = useForm<NameFormType>({
    resolver: zodResolver(nameSchema),
  });

  const handleChangeName = async (data: NameFormType) => {
    if (user) {
      await updateProfile(user, { displayName: data.name })
        .then(() => {
          toast.success('Nome de usuário atualizado');
        })
        .catch(() => {
          toast.error('Erro ao atualizar nome de usuário');
        });
    }
  };

  return {
    handleChangeName,
    handleSubmit: methods.handleSubmit,
    register: methods.register,
  };
};
