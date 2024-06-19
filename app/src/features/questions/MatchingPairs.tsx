import React from "react";
import { useMatchingPairs } from "./hooks/useMatchingPairs";
import Item from "./Item";

const MatchingPairs: React.FC = () => {
  const {
    leftColumn,
    rightColumn,
    selectedItem,
    correctPairs,
    disabledItems,
    incorrectItems,
    handleClick,
  } = useMatchingPairs();

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-center text-2xl font-bold mb-8">
        Select the matching pairs
      </h1>
      <div className="flex justify-center items-center gap-5">
        <div className="flex flex-col gap-2">
          {leftColumn.map((item) => (
            <Item
              key={item}
              item={item}
              column="left"
              onClick={handleClick}
              isSelected={
                selectedItem?.item === item && selectedItem.column === "left"
              }
              isDisabled={disabledItems.includes(item)}
              isCorrect={
                correctPairs.includes(item) && !disabledItems.includes(item)
              }
              isIncorrect={incorrectItems.includes(item)}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {rightColumn.map((item) => (
            <Item
              key={item}
              item={item}
              column="right"
              onClick={handleClick}
              isSelected={
                selectedItem?.item === item && selectedItem.column === "right"
              }
              isDisabled={disabledItems.includes(item)}
              isCorrect={
                correctPairs.includes(item) && !disabledItems.includes(item)
              }
              isIncorrect={incorrectItems.includes(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchingPairs;
