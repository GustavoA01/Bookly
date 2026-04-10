'use client';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Spinner } from '@/src/components/ui/spinner';
import { SignInFormType, SignUpFormType } from '@/src/data/schemas';
import Link from 'next/link';
import { UseFormRegister } from 'react-hook-form';

type EmailPassProps = {
  actionLabel: string;
  labelAction?: string;
  pathPasswordRecovery?: string;
  labelPasswordRecovery?: string;
  register: UseFormRegister<SignUpFormType | SignInFormType>;
  isPending: boolean;
};

export const EmailPass = ({
  actionLabel,
  pathPasswordRecovery,
  labelPasswordRecovery,
  labelAction,
  register,
  isPending,
}: EmailPassProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label>EMAIL</Label>
        <Input placeholder="exemplo@bookly.com" {...register('email')} />
      </div>
      <div className="space-y-2">
        <Label>SENHA</Label>
        <Input
          type="password"
          placeholder="********"
          {...register('password')}
        />
      </div>

      <Button className="w-full" disabled={isPending}>
        {actionLabel}
        {isPending && <Spinner data-testid="auth-spinner" />}
      </Button>

      {pathPasswordRecovery && (
        <div className="text-right space-x-2 text-sm">
          <span className="text-muted-foreground">{labelPasswordRecovery}</span>
          <Link
            href={pathPasswordRecovery}
            className="text-primary font-semibold hover:underline"
          >
            {labelAction}
          </Link>
        </div>
      )}
    </div>
  );
};
