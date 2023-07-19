"use client";

import * as RadixSlider from "@radix-ui/react-slider";
import { twMerge } from "tailwind-merge";

interface DurationSliderProps {
  value?: number;
  maxValue?: number;
  onChange?: (value: number) => void;
  isMobile?: boolean;
}

const DurationSlider: React.FC<DurationSliderProps> = ({
  value = 0,
  onChange,
  maxValue,
  isMobile = false,
}) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className="
        relative 
        flex 
        items-center 
        select-none 
        touch-none 
        w-full 
        h-fit
      "
      defaultValue={[value]}
      value={[value]}
      onValueChange={handleChange}
      max={maxValue}
      aria-label="Volume"
    >
      <RadixSlider.Track
        className={twMerge(
          "bg-neutral-600 relative grow rounded-full cursor-pointer",
          isMobile ? "h-0.5" : "h-1"
        )}
      >
        <RadixSlider.Range
          className="
            absolute 
            bg-emerald-600 
            rounded-full 
            h-full
          "
        />
      </RadixSlider.Track>
      {!isMobile && (
        <RadixSlider.Thumb
          className="block w-3 h-3 bg-white rounded-full cursor-pointer"
          aria-label="Duration"
        />
      )}
    </RadixSlider.Root>
  );
};

export default DurationSlider;
