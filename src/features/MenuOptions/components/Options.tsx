import { Button } from '@/src/components/ui/button';

type OptionsProps = {
  handleOpenUserDialog: () => void;
  handleOpenPasswordDialog: () => void;
};

export const Options = ({ handleOpenUserDialog, handleOpenPasswordDialog }: OptionsProps) => (
  <>
    <Button variant="outline" onClick={handleOpenUserDialog}>
      Alterar nome de usuário
    </Button>
    <Button variant="outline" onClick={handleOpenPasswordDialog}>
      Alterar senha
    </Button>
  </>
);
