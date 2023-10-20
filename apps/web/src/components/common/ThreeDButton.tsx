import { cn } from "@/utils/helpers";
import React from "react";

interface Props {
  title: string;
  variant:
    | "btn-info"
    | "btn-danger"
    | "btn-success"
    | "btn-default"
    | "btn-white"
    | "btn-warning"
    | "btn-magick"
    | "btn-primary";
  onClick: () => void;
  className?: string;
}

const ThreeDButton: React.FC<Props> = ({
  variant,
  title,
  onClick,
  className,
}) => (
  <button
    onClick={onClick}
    type="button"
    className={cn("btn btn-lg btn3d  lowercase font-mono", variant, className)}
  >
    <span className="glyphicon glyphicon-ok" /> {title}
  </button>
);
export default ThreeDButton;
