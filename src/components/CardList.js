import React from "react";
import Card from "./Card.js";

const CardList = ({ robots }) => {
  return (
    <div>
      {robots.map((user, i) => {
        return (
          <Card
            key={i}
            id={robots[i]}
            name={robots[i]}
          />
        );
      })}
    </div>
  );
};

export default CardList;
