import React, { Children } from "react";
import Countdown, { CountdownRenderProps, zeroPad } from "react-countdown";

type CountdownProps = {
  date: Date;
  children: React.ReactElement | React.ReactElement[];
  text?: string;
};

const CustomCountdown = ({ date, children, text }: CountdownProps) => {
  const customRenderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    const pluralise = (number: number, description: string): string => {
      if (number === 0) return "";
      return `${number} ${description + (number > 1 ? "s" : "")}`;
    };
    if (completed) {
      // Render a completed state
      return children;
    } else {
      // Render a countdown
      return (
        <>
          {!completed && <p>{text}</p>}
          <span>
            {`${pluralise(days, "day")} ${pluralise(hours, "hour")} ${pluralise(
              minutes,
              "minute"
            )} ${pluralise(seconds, "second")}`}
          </span>
        </>
      );
    }
  };

  return (
    <>
      <Countdown date={date} renderer={customRenderer}>
        <>{children}</>
      </Countdown>
    </>
  );
};

export default CustomCountdown;
