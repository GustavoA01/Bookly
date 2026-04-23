import Link from 'next/link';
import { HaveAccountProps } from '../types';

export const HaveAccount = ({
  labelHref,
  labelAction,
  label,
}: HaveAccountProps) => (
  <p className="mt-4 text-sm">
    {label}{' '}
    <Link
      href={labelHref}
      className="text-primary font-semibold hover:underline"
    >
      {labelAction}
    </Link>
  </p>
);
