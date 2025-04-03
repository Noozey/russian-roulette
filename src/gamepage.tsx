import gamepage from "./image/gamepage.jpg";
import cardback from "./image/gameimages/cardback.png";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import { usePlayer } from "./context/PlayerContext";
import { useNavigate } from "react-router";
import king from "./image/deck/king.png";
import Queen from "./image/deck/queen.png";
import Ace from "./image/deck/ace.png";
import Jocker from "./image/deck/joker.png";
import eyeopen from "./image/open.svg";
import eyeoclosed from "./image/closed.svg";

export default function Gamepage() {
  const navigate = useNavigate();
  const { playerNumber } = usePlayer();
  if (playerNumber === 0 || null) {
    navigate("/");
  }

  return (
    <div
      className="flex justify-center items-center w-screen h-screen bg-cover bg-center gap-4"
      style={{ backgroundImage: `url(${gamepage})` }}
    >
      <CardBundle />
    </div>
  );
}
const CardBundle = () => {
  const { playerNumber } = usePlayer();
  const cardNumber = 5;
  const [startGame, setStartGame] = useState<boolean>(false);
  const [showCardPlayerOne, setShowCardPlayerOne] = useState<boolean>(false);
  const [showCardPlayerTwo, setShowCardPlayerTwo] = useState<boolean>(false);
  const [showCardPlayerThree, setShowCardPlayerThree] =
    useState<boolean>(false);
  const [showCardPlayerFour, setShowCardPlayerFour] = useState<boolean>(false);

  return (
    <div className="2xl:w-[1536px] 2xl:h-[900px] w-[1440px] h-[800px] grid grid-rows-7 grid-cols-7">
      {/* Top CardStack */}
      <div className="flex justify-center items-start col-start-3 col-end-6">
        {showCardPlayerTwo ? (
          <FrontCards />
        ) : (
          <BackCard
            cardNumber={cardNumber}
            cardBack={cardback}
            alignment="start"
          />
        )}
      </div>

      {/* Left CardStack */}
      {playerNumber <= 3 ? null : (
        <div
          className={`justify-center items-center row-start-2 row-end-4 rotate-90 col-start-1`}
        >
          {showCardPlayerFour ? (
            <FrontCards />
          ) : (
            <BackCard
              cardNumber={cardNumber}
              cardBack={cardback}
              alignment="start"
            />
          )}
        </div>
      )}

      {/* Bottom CardStack */}
      <div className="flex justify-center items-end row-start-7 col-start-3 col-end-6">
        {showCardPlayerOne ? (
          <FrontCards />
        ) : (
          <BackCard
            cardNumber={cardNumber}
            cardBack={cardback}
            alignment="end"
          />
        )}
      </div>

      {/* Right CardStack */}
      {playerNumber <= 2 ? null : (
        <div className="flex justify-center items-center col-start-7 row-start-2 row-end-4 rotate-90">
          {showCardPlayerThree ? (
            <FrontCards />
          ) : (
            <BackCard
              cardNumber={cardNumber}
              cardBack={cardback}
              alignment="end"
            />
          )}
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

      {/*playerOne*/}
      <div
        className={`row-start-7 col-start-6 flex justify-center items-center`}
      >
        <button
          className="bg-transparent"
          onClick={() => {
            setShowCardPlayerOne(showCardPlayerOne ? false : true);
          }}
        >
          {showCardPlayerOne ? (
            <img className="h-[50px]" src={eyeopen} />
          ) : (
            <img className="h-[50px]" src={eyeoclosed} />
          )}
        </button>
      </div>

      {/*playerTwo*/}
      <div className="row-start-1 col-start-6 flex justify-center items-center">
        <button
          className="bg-transparent"
          onClick={() => {
            setShowCardPlayerTwo(showCardPlayerTwo ? false : true);
          }}
        >
          {showCardPlayerTwo ? (
            <img className="h-[50px]" src={eyeopen} />
          ) : (
            <img className="h-[50px]" src={eyeoclosed} />
          )}
        </button>
      </div>

      {/*playerThree*/}
      {playerNumber <= 2 ? null : (
        <div className="row-start-4 col-start-8 flex justify-center items-center ">
          <button
            className="bg-transparent"
            onClick={() => {
              setShowCardPlayerThree(showCardPlayerThree ? false : true);
            }}
          >
            {showCardPlayerThree ? (
              <img className="h-[50px]" src={eyeopen} />
            ) : (
              <img className="h-[50px]" src={eyeoclosed} />
            )}
          </button>
        </div>
      )}
      {/*playerFour*/}
      {playerNumber <= 3 ? null : (
        <div className="row-start-4 col-start-1 flex justify-start items-center ">
          <button
            className="bg-transparent"
            onClick={() => {
              setShowCardPlayerFour(showCardPlayerFour ? false : true);
            }}
          >
            {showCardPlayerFour ? (
              <img className="h-[50px]" src={eyeopen} />
            ) : (
              <img className="h-[50px]" src={eyeoclosed} />
            )}
          </button>
        </div>
      )}
    </div>
  );
};
const BackCard = ({
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
          className={`2xl:w-[125px] 2xl:h-[175px] w-[100px] h-[150px] rounded-lg shadow-2xs hover:border-2 hover:border-black`}
          initial={{ y: 0, opacity: 0, x: 0 }}
          animate={{
            y: 0,
            x: isRevealed ? i * 10 : 50,
            opacity: 1,
          }}
          transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
        />
      ))}
    </div>
  );
};
const FrontCards = () => {
  const isRevealed = true;
  const cards = [1, 4, 2, 3, 2];
  return (
    <div className={`flex h-fit items-end`}>
      {cards.map((value, i) => (
        <motion.img
          key={i}
          src={
            value === 1
              ? king
              : value === 2
              ? Queen
              : value === 3
              ? Ace
              : Jocker
          }
          className={`2xl:w-[125px] 2xl:h-[175px]  w-[100px] h-[150px] rounded-lg shadow-2xs hover:border-2 hover:border-black`}
          initial={{ y: 0, opacity: 0, x: 0 }}
          animate={{
            y: 0,
            x: isRevealed ? i * 10 : 40,
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
