type FormErrorMessageProps = {
  showMessage: boolean;
  message: string | undefined | null;
  className?: string;
};

export const FormErrorMessage = ({ showMessage, message, className }: FormErrorMessageProps) => (
  <>{showMessage && <p className={`text-sm text-red-600 ${className}`}>{message}</p>}</>
);
