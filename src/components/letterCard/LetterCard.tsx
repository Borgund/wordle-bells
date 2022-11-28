import classnames from "classnames";
import React from "react";
import styles from "./LetterCard.module.scss";

type LetterCardProps = {
  letter?: string;
  correctPosition?: boolean;
  correctLetter?: boolean;
};

const LetterCard = ({
  letter,
  correctLetter,
  correctPosition,
}: LetterCardProps) => {
  const charAtZero = letter?.charAt(0);
  return (
    <div
      className={classnames(
        styles.cardWrapper,
        correctPosition
          ? styles.correctPosition
          : correctLetter
          ? styles.correctLetter
          : ""
      )}
    >
      {charAtZero}
    </div>
  );
};

export default LetterCard;
