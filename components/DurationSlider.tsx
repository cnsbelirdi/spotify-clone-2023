"use client";

import * as RadixSlider from "@radix-ui/react-slider";

interface DurationSliderProps {
  value?: number;
  maxValue?: number;
  onChange?: (value: number) => void;
}

const DurationSlider: React.FC<DurationSliderProps> = ({
  value = 0,
  onChange,
  maxValue,
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
        className="
          bg-neutral-600 
          relative 
          grow 
          rounded-full 
          h-[4px]
        "
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
      <RadixSlider.Thumb
        className="block w-3 h-3 bg-white rounded-full"
        aria-label="Duration"
      />
    </RadixSlider.Root>
  );
};

export default DurationSlider;
