export function Panel({
  children,
  title
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className={`rounded-4xl p-4 bg-white shadow-smooth relative h-full overflow-hidden`}>

      {/* Header */}
      <div className="flex p-2 lg:p-4">
        <h3 className="text-sm font-bold font-hb text-blueish-600">{title}</h3>
      </div>

      {/* Body */}
      <div className={`p-2 lg:p-4 h-[90%]`}>
        {children}
      </div>

    </div>
  );
}