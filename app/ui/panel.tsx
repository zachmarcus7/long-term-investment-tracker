import { JSX } from 'react';

export function Panel({
  children,
  title,
  heightFull = false
}: {
  children: React.ReactNode | Promise<JSX.Element>;
  title: string;
  heightFull?: boolean;
}) {
  return (
    <div className={`rounded-3xl p-2 bg-white shadow-sm border border-slate-100 ${heightFull && 'h-full'}`}>

      {/* Header */}
      <div className="flex p-2 lg:p-4">
        <h3 className="text-sm font-bold hb">{title}</h3>
      </div>

      {/* Body */}
      <div className={`p-2 lg:p-4 ${heightFull && 'lg:h-[90%]'}`}>
        {children}
      </div>

    </div>
  );
}