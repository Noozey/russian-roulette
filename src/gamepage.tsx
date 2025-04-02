import gamepage from "./image/gamepage.jpg";
import cardback from "./image/gameimages/cardback.png";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import { usePlayer } from "./context/PlayerContext";
import { useNavigate } from "react-router";

export default function Gamepage() {
  const { playerNumber } = usePlayer();
  const [cardNumber, setCardNumber] = useState<number>(5);
  const [startGame, setStartGame] = useState<boolean>(false);
  console.log(playerNumber);

  const navigate = useNavigate();
  if (playerNumber === 0 || null) {
    navigate("/");
  }

  return (
    <div
      className="flex justify-center items-center w-screen h-screen bg-cover bg-center gap-4"
      style={{ backgroundImage: `url(${gamepage})` }}
    >
      <div className="2xl:w-[1536px] 2xl:h-[900px] w-[1440px] h-[800px] grid grid-rows-7 grid-cols-7">
        {/* Top CardStack */}
        <div className="flex justify-center items-start col-start-3 col-end-6">
          <CardStack
            cardNumber={cardNumber}
            cardBack={cardback}
            alignment="start"
          />
        </div>

        {/* Left CardStack */}
        {playerNumber <= 3 ? null : (
          <div
            className={`justify-center items-center row-start-2 row-end-4 rotate-90 col-start-1`}
          >
            <CardStack
              cardNumber={cardNumber}
              cardBack={cardback}
              alignment="start"
            />
          </div>
        )}

        {/* Bottom CardStack */}
        <div className="flex justify-center items-end row-start-7 col-start-3 col-end-6">
          <CardStack
            cardNumber={cardNumber}
            cardBack={cardback}
            alignment="end"
          />
        </div>

        {/* Right CardStack */}
        {playerNumber <= 2 ? null : (
          <div className="flex justify-center items-center col-start-7 row-start-2 row-end-4 rotate-90">
            <CardStack
              cardNumber={cardNumber}
              cardBack={cardback}
              alignment="end"
            />
          </div>
        )}

        <div
          className={`text-4xl col-start-4 row-start-3 text-white ${
            startGame ? "hidden" : ""
          }`}
        >
          <h1>6 x King</h1>
          <h1>6 x Queen</h1>
          <h1>6 x Ace</h1>
          <h1>2 x jocker</h1>
        </div>
        <div className="text-6xl  text-white row-start-5 col-start-4">
          <Button
            className={`bg-transparent border hover:bg-white hover:text-black ${
              startGame ? "hidden" : ""
            }`}
            onClick={() => {
              setStartGame(true);
            }}
          >
            Start Game
          </Button>
        </div>
      </div>
    </div>
  );
}

const CardStack = ({
  cardNumber,
  cardBack,
  alignment,
}: {
  cardNumber: number;
  cardBack: string;
  alignment: string;
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsRevealed(true), 1000);
  }, []);

  return (
    <div className={`flex h-fit items-${alignment}`}>
      {Array.from({ length: cardNumber }).map((_, i) => (
        <motion.img
          key={i}
          src={cardBack}
          className={`2xl:w-[125px] 2xl:h-[175px] 2xl:hover:h-[180px] w-[100px] h-[150px] rounded-lg shadow-2xs hover:h-[155px] animate-in hover:duration-100`}
          initial={{ y: 0, opacity: 0, x: 0 }}
          animate={{
            y: 0,
            x: isRevealed ? i * 10 : 20,
            opacity: 1,
          }}
          transition={{
            type: "tween",
            duration: 0.6, // Time in seconds
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
