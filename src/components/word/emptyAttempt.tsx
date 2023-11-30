import Word from "./Word";

export const EmptyAttempts = ({
  maxAttempts,
  attempts,
}: {
  maxAttempts: number;
  attempts: number;
}) => {
  const arr = Array(maxAttempts - attempts).fill("");
  return (
    <div>
      {arr.map(() => (
        <Word word={"     "} />
      ))}
    </div>
  );
};
