import { statusColors } from "../data/constants";
import { Status } from "../data/types/books";

type StatusChipProps = {
  status: Status;
  className?: string;
};

export const StatusChip = ({ status, className }: StatusChipProps) => (
  <div
    className={`flex items-center font-semibold gap-2 max-sm:text-xs bg-${statusColors[status].bgColor} text-${statusColors[status].textColor} rounded px-2 py-1 w-max ${className} `}
  >
    {statusColors[status].icon}
    <p>{statusColors[status].label}</p>
  </div>
);
