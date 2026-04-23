import { InfoSectionProps } from '../../types';

export const InfoSection = ({ label, value, icon }: InfoSectionProps) => (
  <section className="flex justify-between items-center mt-4 gap-2">
    <div className="flex items-center gap-2">
      {icon}
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
    <p className="font-bold line-clamp-1 truncate">{value}</p>
  </section>
);
