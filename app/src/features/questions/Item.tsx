import React from "react";
import { Button } from "components";

interface ItemProps {
  item: string;
  column: "left" | "right";
  onClick: (item: string, column: "left" | "right") => void;
  isSelected: boolean;
  isDisabled: boolean;
  isCorrect: boolean;
  isIncorrect: boolean;
}

const Item: React.FC<ItemProps> = ({
  item,
  column,
  onClick,
  isSelected,
  isDisabled,
  isCorrect,
  isIncorrect,
}) => {
  let variant:
    | "default"
    | "selected"
    | "focused"
    | "disabled"
    | "correct"
    | "incorrect" = "default";
  if (isSelected) variant = "selected";
  if (isDisabled) variant = "disabled";
  if (isCorrect) variant = "correct";
  if (isIncorrect) variant = "incorrect";

  return (
    <Button
      onClick={() => !isDisabled && onClick(item, column)}
      variant={variant}
      width="w-40"
    >
      {item}
    </Button>
  );
};

export default Item;
