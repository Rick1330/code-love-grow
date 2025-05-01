
import LogProgressDialog from "@/components/tracker/LogProgressDialog";
import { TrackerEntry } from "@/services/api";

interface TrackerHeaderProps {
  onSubmit: (data: TrackerEntry) => Promise<boolean>;
}

const TrackerHeader = ({ onSubmit }: TrackerHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
      <h1 className="text-2xl md:text-3xl font-bold">Coding Tracker</h1>
      <div className="flex items-center gap-4">
        <LogProgressDialog onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default TrackerHeader;
