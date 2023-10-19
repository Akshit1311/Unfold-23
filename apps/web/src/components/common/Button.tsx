import React from "react";

// Utils
import { cn } from "@/utils/helpers";

type ButtonProps = {
  text: string;
  className?: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ text, className, onClick }) => (
  <button
    type="button"
    className={cn(
      className,
      "border-none outline-none  bg-custom-1 da text-white  py-2 px-6 rounded-lg  transition-all duration-300 ease-in-out hover:bg-custom-1/80"
    )}
    onClick={onClick}
  >
    {text}
  </button>
);
export default React.memo(Button);
