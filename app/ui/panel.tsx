import { JSX } from 'react';
import {
  BanknotesIcon,
  ClockIcon,
  InboxIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
  trendingUp: ArrowTrendingUpIcon
};

export function Panel({
  children,
  title,
  icon
}: {
  children: React.ReactNode | Promise<JSX.Element>;
  title: string;
  icon: 'invoices' | 'customers' | 'pending' | 'collected' | 'trendingUp';
}) {
  const Icon = iconMap[icon];

  return (
    <div className="rounded-2xl bg-white p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}