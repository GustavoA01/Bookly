import { statusColors } from '../data/constants';
import { Status } from '../data/types/books';

type StatusChipProps = {
  status: Status;
  className?: string;
};

export const StatusChip = ({ status, className }: StatusChipProps) => {
  const Icon = statusColors[status].icon;
  return (
    <div
      className={`flex items-center font-semibold gap-2 max-sm:text-xs bg-${statusColors[status].bgColor} text-${statusColors[status].textColor} rounded px-2 py-1 w-max ${className} `}
    >
      <Icon size={14} />
      <p>{statusColors[status].label}</p>
    </div>
  );
};
