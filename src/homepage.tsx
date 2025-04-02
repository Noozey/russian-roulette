import homepage from "./image/homepage.svg";
// import homepage1 from "./image/homepage1.png";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useNavigate } from "react-router";
import { usePlayer } from "./context/PlayerContext";

function HomepageUi() {
  const { playerNumber, setPlayerNumber } = usePlayer();
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div
      className="w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${homepage})` }}
    >
      <div className="flex flex-col items-start">
        <Button
          className="text-white text-6xl mt-[500px] ml-[50px] bg-transparent hover:text-7xl hover:bg-transparent cursor-pointer"
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          Play
        </Button>
        <Dialog open={dialogOpen}>
          <DialogContent className="w-[500px] h-auto">
            <DialogHeader>
              <DialogTitle>Game Settings</DialogTitle>
              <DialogDescription>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center justify-center gap-3">
                    Number of player:
                    <div className="text-xl font-semibold">{playerNumber}</div>
                  </div>
                  <div className="flex flex-row gap-5 w-full items-center justify-center">
                    <Button
                      className="bg-white border text-black hover:text-white hover:bg-black w-28"
                      onClick={() => {
                        setPlayerNumber(2);
                      }}
                    >
                      2
                    </Button>
                    <Button
                      className="bg-white border text-black hover:text-white hover:bg-black w-28"
                      onClick={() => {
                        setPlayerNumber(3);
                      }}
                    >
                      3
                    </Button>
                    <Button
                      className="bg-white border text-black hover:text-white hover:bg-black w-28"
                      onClick={() => {
                        setPlayerNumber(4);
                      }}
                    >
                      4
                    </Button>
                  </div>
                  <Button
                    className="w-fit ml-auto"
                    onClick={() => {
                      setDialogOpen(false);
                      if (playerNumber !== 0) {
                        navigate("/gamepage");
                      }
                    }}
                  >
                    Set
                  </Button>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Button className="text-white text-5xl mt-[50px]  ml-[50px] bg-transparent hover:text-6xl hover:bg-transparent cursor-pointer">
          setting
        </Button>
      </div>
    </div>
  );
}

export default HomepageUi;
