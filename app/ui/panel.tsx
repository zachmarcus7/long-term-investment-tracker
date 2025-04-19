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
  icon,
  heightFull = false
}: {
  children: React.ReactNode | Promise<JSX.Element>;
  title: string;
  icon: 'invoices' | 'customers' | 'pending' | 'collected' | 'trendingUp';
  heightFull?: boolean;
}) {
  const Icon = iconMap[icon];

  return (
    <div className={`rounded-3xl p-2 bg-white shadow-xs ${heightFull && 'h-full'}`}>

      {/* Header */}
      <div className="flex p-2 lg:p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>

      {/* Body */}
      <div className={`p-2 lg:p-4 ${heightFull && 'lg:h-[90%]'}`}>
        {children}
      </div>

    </div>
  );
}