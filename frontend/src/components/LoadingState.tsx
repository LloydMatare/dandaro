import { Loader2 } from "lucide-react";

function LoadingState() {
  return (
    <div className="flex items-center gap-1">
      <p className="">Loading </p>
      <Loader2 className="animate-spin" />
    </div>
  );
}

export default LoadingState;
