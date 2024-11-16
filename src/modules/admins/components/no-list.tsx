import { Button } from "@/components/ui/button";
import React from "react";

interface NoListComponentProps {
  label?: string;
  description?: string;
  action?: () => void;
  className?: string;
}

export const NoListComponent: React.FC<NoListComponentProps> = ({
  label,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={`flex flex-1 items-center h-full justify-center rounded-lg border border-dashed shadow-sm ${className}`}
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        {label && (
          <h3 className="text-2xl font-bold tracking-tight">No {label}s</h3>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {action && (
          <Button onClick={action} className="mt-4">
            Add {label}
          </Button>
        )}
      </div>
    </div>
  );
};
