import { ChangeEvent, useCallback, useMemo, useState } from "react";

import "./ChallengeComponent.css";

// COMPONENTS
import Column from "./components/Column";

// TYPES
import { ChallengeComponentTypes } from "./types/ChallengeComponent";

const InitialColumnState = [
  { title: "To Do", contents: [{ title: "Mow The Lawn" }] },
  { title: "In Progress", contents: [{ title: "Pull Weeds" }] },
  { title: "Done", contents: [{ title: "Rake The Leaves" }] },
];

export function ChallengeComponent() {
  const [columns, setColumns] =
    useState<ChallengeComponentTypes.IColumn[]>(InitialColumnState);
  const [newItem, setNewItem] = useState<string>("");

  const handleChangeItem = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNewItem(e.target.value);
    },
    [setNewItem]
  );

  const addNewItem = useCallback(() => {
    if (!newItem) return;

    let _columns = [...columns];
    _columns[0].contents.push({ title: newItem });

    setColumns(_columns);
    setNewItem("");
  }, [newItem, columns, setColumns, setNewItem]);

  const previousClick = useCallback(
    (item: ChallengeComponentTypes.IContent, index: number) => {
      if (index === 0) return;

      let _columns = [...columns];

      let position = _columns[index].contents.indexOf(item);

      if (position === -1) return;

      _columns[index].contents.splice(position, 1);
      _columns[index - 1].contents.push(item);

      setColumns(_columns);
    },
    [setColumns, columns]
  );

  const nextClick = useCallback(
    (item: ChallengeComponentTypes.IContent, index: number) => {
      if (index === columns.length) return;

      let _columns = [...columns];

      let position = _columns[index].contents.indexOf(item);

      if (position === -1) return;

      _columns[index].contents.splice(position, 1);
      _columns[index + 1].contents.push(item);

      setColumns(_columns);
    },
    [setColumns, columns]
  );

  const renderColumns = useMemo(() => {
    return columns.map((col, index) => {
      return (
        <Column
          key={col.title}
          previousClick={previousClick}
          nextClick={nextClick}
          index={index}
          column={col}
        />
      );
    });
  }, [columns, previousClick, nextClick]);

  return (
    <div id="ChallengeComponent">
      <div className="column-row">{renderColumns}</div>
      <div className="control-row">
        <input
          maxLength={20}
          value={newItem}
          onChange={handleChangeItem}
          placeholder="Add Task"
        />
        <button onClick={addNewItem}>+</button>
      </div>
    </div>
  );
}
