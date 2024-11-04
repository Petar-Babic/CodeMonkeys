"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
  progressClassName?: string;
  indicatorClassName?: string;
  onBack?: () => void;
}

export default function StepProgress({
  currentStep,
  totalSteps,
  className,
  progressClassName,
  indicatorClassName,
  onBack,
}: StepProgressProps) {
  return (
    <div className={`flex  flex-col gap-2 ${className}`}>
      <div className="flex h-12 pt-2 px-4 items-center justify-between text-sm text-white/80">
        {currentStep > 1 ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-0 hover:bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="font-medium text-sm">Back</span>
          </Button>
        ) : (
          <div className="w-16" /> // Placeholder for layout consistency
        )}
        <div className="flex items-center">
          <span className="font-medium">STEP {currentStep}</span>
          <span className="text-white/60 ml-1">OF {totalSteps}</span>
        </div>
        <div className="w-16" /> {/* Placeholder for layout consistency */}
      </div>
      <Progress
        value={(currentStep / totalSteps) * 100}
        className={`w-full h-1 bg-gray-800 ${progressClassName}`}
        indicatorClassName={`bg-white ${indicatorClassName}`}
      />
    </div>
  );
}
