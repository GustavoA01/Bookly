import { Button } from '@/src/components/ui/button';
import { OptionsProps } from '../types';

export const Options = ({
  handleOpenUserDialog,
  handleOpenPasswordDialog,
}: OptionsProps) => (
  <>
    <Button variant="outline" onClick={handleOpenUserDialog}>
      Alterar nome de usuário
    </Button>
    <Button variant="outline" onClick={handleOpenPasswordDialog}>
      Alterar senha
    </Button>
  </>
);
