import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export function Notification({
  message,
  type = "info",
  onClose,
  duration = 4000,
}: NotificationProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateProgress = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const newProgress = (remaining / duration) * 100;
      setProgress(newProgress);

      if (remaining > 0) {
        requestAnimationFrame(updateProgress);
      } else {
        onClose();
      }
    };

    const animationFrame = requestAnimationFrame(updateProgress);
    const timeout = setTimeout(onClose, duration);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
    };
  }, [duration, onClose]);

  const bgColor = {
    success: "bg-brand-green/10 text-brand-green border-brand-green/20",
    error: "bg-red-50 text-red-800 border-red-200",
    info: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
  }[type];

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 w-96 rounded-lg border p-4 shadow-lg transition-all duration-300",
        bgColor
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
          <div className="mt-2 flex items-center space-x-2">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-black/10">
              <div
                className="h-full transition-all duration-100"
                style={{
                  width: `${progress}%`,
                  backgroundColor:
                    type === "success"
                      ? "var(--brand-green)"
                      : type === "error"
                      ? "var(--red-600)"
                      : "var(--brand-blue)",
                }}
              />
            </div>
            <span className="text-xs text-gray-500">
              {Math.ceil((progress / 100) * (duration / 1000))}s
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-4 inline-flex h-5 w-5 items-center justify-center rounded-full hover:bg-black/10"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
