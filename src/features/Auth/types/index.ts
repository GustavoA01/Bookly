import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

export type HaveAccountProps = {
  labelHref: string;
  labelAction: string;
  label: string;
};

export type EmailPassProps<T extends FieldValues> = {
  actionLabel: string;
  labelAction?: string;
  pathPasswordRecovery?: () => void;
  labelPasswordRecovery?: string;
  register: UseFormRegister<T>;
  isPending: boolean;
  nameEmail: Path<T>;
  namePassword: Path<T>;
};

export type AuthHeaderProps = {
  title: string;
  description: string;
};
