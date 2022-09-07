import "./styles.css";

// ASSETS
import arrowL from "../../assets/icons/arrowL.png";
import arrowR from "../../assets/icons/arrowR.png";

// TYPES
import { ChallengeComponentTypes } from "../../types/ChallengeComponent";

export type ItemProps = {
  item: ChallengeComponentTypes.IContent;
  previousClick: (item: ChallengeComponentTypes.IContent) => void;
  nextClick: (item: ChallengeComponentTypes.IContent) => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
};

export function Item({
  item,
  previousClick,
  nextClick,
  previousDisabled,
  nextDisabled,
}: ItemProps) {
  return (
    <div className="item-container">
      <button onClick={() => previousClick(item)} disabled={previousDisabled}>
        <img alt="Move Back Button Icon" src={arrowL} />
      </button>
      <p>{item.title}</p>
      <button
        onClick={() => nextClick(item)}
        disabled={nextDisabled}
        className="green"
      >
        <img alt="Move Forward Button Icon" src={arrowR} />
      </button>
    </div>
  );
}
