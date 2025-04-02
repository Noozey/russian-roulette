import React, { createContext, useState, useContext } from "react";

interface PlayerContextType {
  playerNumber: number;
  setPlayerNumber: (num: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [playerNumber, setPlayerNumber] = useState(0);

  return (
    <PlayerContext.Provider value={{ playerNumber, setPlayerNumber }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
