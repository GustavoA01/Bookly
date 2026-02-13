"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import Link from "next/link";

type EmailPassProps = {
  actionLabel?: string;
  action: () => void;
  labelAction?: string;
  pathPasswordRecovery?: string;
  labelPasswordRecovery?: string;
  showRecovery?: boolean;
};

export const EmailPass = ({
  action,
  actionLabel,
  pathPasswordRecovery,
  labelPasswordRecovery,
  labelAction,
  showRecovery,
}: EmailPassProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label>EMAIL</Label>
        <Input placeholder="exemplo@bookly.com" />
      </div>
      <div className="space-y-2">
        <Label>SENHA</Label>
        <Input type="password" placeholder="********" />
      </div>

      <Button onClick={action} className="w-full">
        {actionLabel}
      </Button>

      {showRecovery && (
        <div className="text-right space-x-2 text-sm">
          <span className="text-muted-foreground">{labelPasswordRecovery}</span>
          <Link
            href={pathPasswordRecovery!}
            className="text-primary font-semibold"
          >
            {labelAction}
          </Link>
        </div>
      )}
    </div>
  );
};
