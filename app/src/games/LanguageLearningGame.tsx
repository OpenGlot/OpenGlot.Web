import React, { useState, useEffect, useCallback } from "react";

const GRID_SIZE = 10;
const CELL_SIZE = 40;

const partsOfSpeech = ["noun", "verb", "adjective", "adverb"] as const;

type PartOfSpeech = (typeof partsOfSpeech)[number];

const words = {
  noun: ["cat", "house", "tree", "book", "car"],
  verb: ["run", "jump", "swim", "read", "drive"],
  adjective: ["big", "small", "red", "fast", "slow"],
  adverb: ["quickly", "slowly", "loudly", "softly", "carefully"],
};

interface ObjectType {
  x: number;
  y: number;
  type: PartOfSpeech;
  word: string;
}

interface Position {
  x: number;
  y: number;
}

const LanguageLearningGame: React.FC = () => {
  const [playerPosition, setPlayerPosition] = useState<Position>({
    x: GRID_SIZE - 1,
    y: GRID_SIZE - 1,
  });
  const [objects, setObjects] = useState<ObjectType[]>([]);
  const [score, setScore] = useState(0);
  const [targetPartOfSpeech, setTargetPartOfSpeech] = useState<PartOfSpeech>(
    partsOfSpeech[0]
  );
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [settings, setSettings] = useState({
    highlight: true,
    speed: 500,
  });
  const [showSettings, setShowSettings] = useState(false);

  const removeObject = useCallback((objToRemove: ObjectType) => {
    setObjects((prevObjects) =>
      prevObjects.filter((obj) => obj !== objToRemove)
    );
  }, []);

  const checkScoring = useCallback(
    (object: ObjectType | undefined) => {
      if (object) {
        if (object.type === targetPartOfSpeech) {
          setScore((prevScore) => prevScore + 1);
          setMessage(
            `Correct! You scored with "${object.word}", which is a ${object.type}.`
          );
          removeObject(object);
          return true;
        } else {
          setGameOver(true);
          setMessage(
            `Game Over! You interacted with "${object.word}", which is a ${object.type}, not a ${targetPartOfSpeech}.`
          );
          return false;
        }
      }
      return true;
    },
    [targetPartOfSpeech, removeObject]
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      const newPosition = { ...playerPosition };

      switch (e.key) {
        case "ArrowUp":
          newPosition.y = Math.max(0, newPosition.y - 1);
          break;
        case "ArrowDown":
          newPosition.y = Math.min(GRID_SIZE - 1, newPosition.y + 1);
          break;
        case "ArrowLeft":
          newPosition.x = Math.max(0, newPosition.x - 1);
          break;
        case "ArrowRight":
          newPosition.x = Math.min(GRID_SIZE - 1, newPosition.x + 1);
          break;
        default:
          return;
      }

      if (
        newPosition.x !== playerPosition.x ||
        newPosition.y !== playerPosition.y
      ) {
        const object = objects.find(
          (obj) => obj.x === newPosition.x && obj.y === newPosition.y
        );
        if (checkScoring(object)) {
          setPlayerPosition(newPosition);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [playerPosition, gameOver, checkScoring, objects]);

  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      setObjects((prevObjects) => {
        const objectAtPlayer = prevObjects.find(
          (obj) => obj.x === playerPosition.x && obj.y === playerPosition.y
        );

        let newObjects = prevObjects
          .map((obj) => ({ ...obj, y: obj.y + 1 }))
          .filter((obj) => obj.y < GRID_SIZE);

        const newObjectAtPlayer = newObjects.find(
          (obj) => obj.x === playerPosition.x && obj.y === playerPosition.y
        );

        if (!objectAtPlayer && newObjectAtPlayer) {
          if (checkScoring(newObjectAtPlayer)) {
            newObjects = newObjects.filter((obj) => obj !== newObjectAtPlayer);
          }
        } else if (objectAtPlayer && !newObjectAtPlayer) {
          checkScoring(objectAtPlayer);
        }

        while (newObjects.length < 5) {
          const newType =
            partsOfSpeech[Math.floor(Math.random() * partsOfSpeech.length)];
          const newObj: ObjectType = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: 0,
            type: newType,
            word: words[newType][
              Math.floor(Math.random() * words[newType].length)
            ],
          };
          newObjects.push(newObj);
        }

        return newObjects;
      });
    }, settings.speed);

    return () => clearInterval(gameLoop);
  }, [
    playerPosition,
    targetPartOfSpeech,
    gameOver,
    settings.speed,
    checkScoring,
  ]);

  const handleRestart = () => {
    setPlayerPosition({ x: GRID_SIZE - 1, y: GRID_SIZE - 1 });
    setObjects([]);
    setScore(0);
    setGameOver(false);
    setMessage("");
    setTargetPartOfSpeech(
      partsOfSpeech[Math.floor(Math.random() * partsOfSpeech.length)]
    );
  };

  const handleChangeTarget = () => {
    const currentIndex = partsOfSpeech.indexOf(targetPartOfSpeech);
    const nextIndex = (currentIndex + 1) % partsOfSpeech.length;
    setTargetPartOfSpeech(partsOfSpeech[nextIndex]);
    setMessage(`New target: ${partsOfSpeech[nextIndex]}s`);
  };

  const handleSettingsChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-customBlack p-4">
      <h1 className="text-4xl font-bold mb-4">Language Learning Game</h1>
      <div className="mb-4 flex items-center space-x-4">
        <p className="text-xl">
          Score: {score} | Target: {targetPartOfSpeech}s
        </p>
        <button
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setShowSettings(!showSettings)}
        >
          Settings
        </button>
      </div>
      {showSettings && (
        <div className="mb-4 p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Game Settings</h2>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="highlight">Highlight Words:</label>
            <input
              type="checkbox"
              id="highlight"
              checked={settings.highlight}
              onChange={(e) =>
                handleSettingsChange("highlight", e.target.checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="speed">Game Speed:</label>
            <input
              type="range"
              id="speed"
              min="100"
              max="1000"
              step="100"
              value={settings.speed}
              onChange={(e) =>
                handleSettingsChange("speed", parseInt(e.target.value))
              }
            />
            <span>{settings.speed}ms</span>
          </div>
        </div>
      )}
      <div
        className="relative bg-white border-2 border-gray-300"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {objects.map((obj, index) => (
          <div
            key={index}
            className="absolute flex items-center justify-center text-sm font-bold"
            style={{
              left: obj.x * CELL_SIZE,
              top: obj.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: "lightblue",
              border: settings.highlight
                ? `2px solid ${
                    obj.type === targetPartOfSpeech ? "green" : "red"
                  }`
                : "2px solid transparent",
            }}
          >
            {obj.word}
          </div>
        ))}
        <div
          className="absolute bg-blue-500 rounded-full"
          style={{
            left: playerPosition.x * CELL_SIZE,
            top: playerPosition.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        />
      </div>
      <div className="mt-4 text-lg font-semibold">{message}</div>
      <div className="mt-4 flex space-x-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleChangeTarget}
        >
          Change Target
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleRestart}
        >
          {gameOver ? "Restart" : "New Game"}
        </button>
      </div>
      {gameOver && (
        <div className="mt-4 text-2xl font-bold text-red-500">Game Over!</div>
      )}
      <div className="mt-4">
        <p className="text-lg font-semibold">Controls:</p>
        <p>Use arrow keys to move</p>
      </div>
    </div>
  );
};

export default LanguageLearningGame;
