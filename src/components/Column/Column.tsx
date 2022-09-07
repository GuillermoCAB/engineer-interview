import { useMemo } from "react";
import "./styles.css";

// TYPES
import { ChallengeComponentTypes } from "../../types/ChallengeComponent";

// COMPONENTS
import Item from "../Item";

export type ColumnProps = {
  column: ChallengeComponentTypes.IColumn;
  previousClick: (
    item: ChallengeComponentTypes.IContent,
    index: number
  ) => void;
  nextClick: (item: ChallengeComponentTypes.IContent, index: number) => void;
  index: number;
};

export function Column({
  column,
  previousClick,
  nextClick,
  index,
}: ColumnProps) {
  const renderContents = useMemo(() => {
    return column.contents.map((item) => {
      return (
        <Item
          key={item.title}
          previousClick={(item) => previousClick(item, index)}
          nextClick={(item) => nextClick(item, index)}
          item={item}
          previousDisabled={index === 0}
          nextDisabled={index === 2}
        />
      );
    });
  }, [column, index, previousClick, nextClick]);

  return (
    <div className="column-container">
      <h6>{column.title}</h6>
      {renderContents}
    </div>
  );
}
