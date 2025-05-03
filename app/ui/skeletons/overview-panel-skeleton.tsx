import { Panel } from "@/app/ui/panel";

export default function OverviewPanelSkeleton() {
  return (
    <Panel title="Financial Overview">
      <div className="space-y-3 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-4 w-24 bg-greyish-700 rounded" />
            <div className="h-4 w-16 bg-greyish-800 rounded" />
          </div>
        ))}
      </div>
    </Panel>
  );
}