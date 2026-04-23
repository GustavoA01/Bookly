import { FormErrorMessageProps } from '../data/types/components';

export const FormErrorMessage = ({
  showMessage,
  message,
  className,
}: FormErrorMessageProps) => (
  <>
    {showMessage && (
      <p className={`text-sm text-red-600 ${className}`}>{message}</p>
    )}
  </>
);
