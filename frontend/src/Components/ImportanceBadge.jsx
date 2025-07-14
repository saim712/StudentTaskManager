import { Star, AlertTriangle } from 'lucide-react'; 

export default function ImportanceBadge({ importance, getImportanceDetails }) {
 
  const details = getImportanceDetails(importance);
  return (
    <div className={`ml-2 px-2 py-1 rounded-full flex items-center text-sm font-bold ${details.color}`}>
      {details.icon}
      <span className="ml-1">{details.name}</span>
    </div>
  );
}