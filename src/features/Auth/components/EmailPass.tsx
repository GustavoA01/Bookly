'use client';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Spinner } from '@/src/components/ui/spinner';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type EmailPassProps<T extends FieldValues> = {
  actionLabel: string;
  labelAction?: string;
  pathPasswordRecovery?: () => void;
  labelPasswordRecovery?: string;
  register: UseFormRegister<T>;
  isPending: boolean;
  nameEmail: Path<T>;
  namePassword: Path<T>;
};

export const EmailPass = <T extends FieldValues>({
  actionLabel,
  pathPasswordRecovery,
  labelPasswordRecovery,
  labelAction,
  register,
  isPending,
  nameEmail,
  namePassword,
}: EmailPassProps<T>) => (
  <div className="flex flex-col gap-4">
    <div className="space-y-2">
      <Label>EMAIL</Label>
      <Input placeholder="exemplo@bookly.com" {...register(nameEmail)} />
    </div>
    <div className="space-y-2">
      <Label>SENHA</Label>
      <Input
        type="password"
        placeholder="********"
        {...register(namePassword)}
      />
    </div>

    <Button className="w-full" disabled={isPending}>
      {actionLabel}
      {isPending && <Spinner data-testid="auth-spinner" />}
    </Button>

    {pathPasswordRecovery && (
      <div className="text-right text-sm">
        <span className="text-muted-foreground">{labelPasswordRecovery}</span>
        <Button
          variant="link"
          onClick={pathPasswordRecovery}
          className="text-primary font-semibold hover:underline"
        >
          {labelAction}
        </Button>
      </div>
    )}
  </div>
);
