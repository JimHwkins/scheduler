// Imports
import React from "react";
import DayListItem from "./DayListItem";

// Define DayList component with props
export default function DayList(props) {
  const { days, day, setDay } = props;

  // Map through days to create DayListItems
  const dayListItems = days.map((dayItem) => {
    return (
      <DayListItem
        key={dayItem.id}
        name={dayItem.name}
        spots={dayItem.spots}
        selected={dayItem.name === day}
        setDay={setDay}
      />
    );
  });

  return <ul>{dayListItems}</ul>;
}
