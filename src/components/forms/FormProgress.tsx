import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/tailwind";
import currentStepState from "../../atoms/currentStepAtom";
import { useRecoilState } from "recoil";

const FormProgress = () => {
  const [currentStep, setCurrentStep] = useRecoilState(currentStepState);
  return (
    <div className="flex gap-2 text-sm font-medium text-gray-400">
      {["Description", "Variants", "Combinations", "Price Info"].map(
        (item, i) => (
          <div
            key={i}
            className="flex gap-3 items-center"
            onClick={() => setCurrentStep(i + 1)}
          >
            <span
              className={cn(
                "inline-block px-4 py-1.5 rounded-lg cursor-pointer hover:scale-105 transition-all hover:shadow-md",
                i + 1 <= currentStep ? "bg-sky-50 text-sky-500" : ""
              )}
            >
              {item}
            </span>
            {i < 3 && (
              <ChevronRight
                width={18}
                height={18}
                strokeWidth={2.5}
                stroke="#6b7280"
              />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default FormProgress;
