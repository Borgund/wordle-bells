import { ScoreEntry } from "../wordleTypes";
import styles from "./Score.module.scss";

const testData: ScoreEntry[] = [
  {
    id: "1",
    slug: "1",
    username: "user1",
    attempts: 3,
    solved: true,
  },
  {
    id: "2",
    slug: "2",
    username: "user2",
    attempts: 5,
    solved: false,
  },
  {
    id: "3",
    slug: "3",
    username: "user3",
    attempts: 2,
    solved: true,
  },
  {
    id: "4",
    slug: "4",
    username: "user4",
    attempts: 1,
    solved: true,
  },
  {
    id: "5",
    slug: "5",
    username: "user5",
    attempts: 4,
    solved: false,
  },
  {
    id: "6",
    slug: "6",
    username: "user6",
    attempts: 6,
    solved: true,
  },
  {
    id: "7",
    slug: "7",
    username: "user7",
    attempts: 2,
    solved: false,
  },
  {
    id: "8",
    slug: "8",
    username: "user8",
    attempts: 3,
    solved: true,
  },
  {
    id: "9",
    slug: "9",
    username: "user9",
    attempts: 4,
    solved: true,
  },
  {
    id: "10",
    slug: "10",
    username: "user10",
    attempts: 1,
    solved: false,
  },
];

export const Score = () => {
  const isLoading = false;
  const error = false;
  const scores = testData;

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error :/</>;

  const calculateScores = () => {
    const peeps: Record<string, { score: number; attempts: number }> = {};

    scores.forEach((p) => {
      if (!peeps[p.username]) {
        peeps[p.username] = { score: 0, attempts: 0 };
      }

      if (p.solved) peeps[p.username].score++;
      peeps[p.username].attempts += p.attempts;
    });

    return Object.entries(peeps);
  };

  const sortedScores = calculateScores().sort((a, b) => {
    const scoreDiff = b[1].score - a[1].score;
    if (scoreDiff !== 0) {
      return scoreDiff;
    } else {
      return a[1].attempts - b[1].attempts;
    }
  });

  return (
    <table className={styles.scoreTable}>
      <thead>
        <tr>
          <th>Username</th>
          <th>Total Score</th>
          <th>Total Attempts</th>
        </tr>
      </thead>
      <tbody>
        {sortedScores.map(([username, { score, attempts }]) => (
          <tr key={username}>
            <td>{username}</td>
            <td>{score}</td>
            <td>{attempts}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
