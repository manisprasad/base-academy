// components/DashboardCard.tsx
import { type ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  description: string;
  value: string;
  icon: ReactNode;
  trendColor: 'green' | 'red';
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  value,
  icon,
  trendColor,
}) => {
  return (
    <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
      <div className="grid auto-rows-min items-start gap-1.5 px-6 grid-cols-[1fr_auto]">
        <div className="leading-none font-semibold">{title}</div>
        <div className="self-start justify-self-end text-muted-foreground/50">{icon}</div>
        <div className={`text-sm text-${trendColor}-600 col-span-2`}>
          {description}
        </div>
      </div>
      <div className="px-6">
        <div className="font-display text-2xl lg:text-3xl">{value}</div>
      </div>
    </div>
  );
};
