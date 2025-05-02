
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogProgressDialog from "@/components/tracker/LogProgressDialog";
import { TrackerEntry } from "@/services/api";

interface TrackerHeaderProps {
  onSubmit: (data: TrackerEntry) => Promise<boolean>;
}

const TrackerHeader = ({ onSubmit }: TrackerHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">Time Tracker</h1>
        <p className="text-slate-500 mt-1">Monitor your coding progress and build consistent habits</p>
      </div>
      <div className="flex items-center gap-3">
        <LogProgressDialog onSubmit={onSubmit}>
          <Button className="bg-tssk-teal hover:bg-tssk-teal-dark text-white rounded-lg px-4 py-2 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Log Progress</span>
          </Button>
        </LogProgressDialog>
      </div>
    </div>
  );
};

export default TrackerHeader;
