import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated as a, config } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { getCardsByRoundId } from "../api/itemsApi";
import { sendLike } from "../api/resultApi";
import { markUserComplete } from "../api/roundUserApi";

interface CardData {
  id: number;
  text: string;
}

const Card: React.FC<{
  card: CardData;
  onSwipe: (dir: "left" | "right", id: number) => void;
  triggerSwipe: (swipeFunc: (dir: "left" | "right") => void) => void;
}> = ({ card, onSwipe, triggerSwipe }) => {
  const [{ x, rot, opacity }, api] = useSpring(() => ({
    x: 0,
    rot: 0,
    opacity: 1,
  }));

  const swipe = (dir: "left" | "right") => {
    const multiplier = dir === "right" ? 1 : -1;
    api.start({
      x: multiplier * 2000,
      rot: multiplier * 45,
      opacity: 0,
      config: config.stiff,
      onResolve: () => onSwipe(dir, card.id),
    });
  };

  triggerSwipe(swipe);

  const bind = useGesture({
    onDrag: ({ down, movement: [mx], velocity: [vx] }) => {
      const trigger = Math.abs(vx) > 0.3 || Math.abs(mx) > 120;
      const dir = mx > 0 ? "right" : "left";

      if (!down && trigger) {
        swipe(dir);
      } else {
        api.start({ x: down ? mx : 0, rot: down ? mx / 20 : 0, opacity: 1 });
      }
    },
  });

  return (
    <a.div
      {...bind()}
      style={{ x, rotateZ: rot, opacity, touchAction: "none" }}
      className="absolute w-[300px] h-[400px] bg-white rounded-xl shadow-md flex items-center justify-center text-2xl font-bold cursor-grab"
    >
      {card.text}
    </a.div>
  );
};

const Swipe: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const swipeFuncRef = useRef<null | ((dir: "left" | "right") => void)>(null);
  const navigate = useNavigate();
  const [liked, setLiked] = useState<number[]>([]);
 
  const roundId = parseInt(useParams().roundId || "-1");

  useEffect(() => {
    const loadCards = async () => {
      try {
        const res = await getCardsByRoundId(roundId);
        if (res.success) {
          setCards(
            res.data.map((d: any) => {
              return {
                id: d.id,
                text: d.ItemName,
              };
            })
          );
        }
      } catch (e) {
        console.error("Error loading cards:", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadCards();
  }, []);

  const handleSendComplete = async () => {
    try {
      await markUserComplete(roundId, liked);
      navigate(`/waitingresult/${roundId}`, { state: { roundId } });
    } catch (e) {
      console.error("Error marking complete:", e);
    }
  };

  const handleSwipe = (dir: "left" | "right", id: number) => {
    console.log(dir);
    if (dir === "right") {
      setLiked((prev) => [...prev, id]);
    }
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  useEffect(() => {
    if (!isLoading && cards.length === 0) {
      handleSendComplete();
    }
  }, [cards]);

  const triggerSwipe = (func: (dir: "left" | "right") => void) => {
    swipeFuncRef.current = func;
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-secondary">
      <div className="relative w-[300px] h-[400px] flex items-center justify-center mb-8">
        <button
          onClick={() => swipeFuncRef.current?.("left")}
          className="hidden md:flex absolute top-2/5 left-[-50%] z-10 border-2 border-accent text-accent p-2 rounded-full"
        >
          <GoChevronLeft size={24} />
        </button>

        <div className="relative rounded-2xl w-full h-full">
          <div className="absolute rounded-2xl w-full h-full bg-white rotate-12 shadow-sm" />
          <div className="absolute rounded-2xl w-full h-full bg-white rotate-6 shadow-sm" />
          <div className="absolute rounded-2xl w-full h-full bg-white shadow" />

          {cards.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              onSwipe={handleSwipe}
              triggerSwipe={(func) => {
                if (index === cards.length - 1) {
                  triggerSwipe(func);
                }
              }}
            />
          ))}

          {!isLoading && cards.length === 0 && (
            <div className="absolute w-full h-full flex items-center justify-center text-lg text-gray-500 font-medium">
              All Done!!
            </div>
          )}
        </div>

        <button
          onClick={() => swipeFuncRef.current?.("right")}
          className="hidden md:flex absolute top-2/5 right-[-50%] z-10 border-2 border-accent text-accent p-2 rounded-full"
        >
          <GoChevronRight size={24} />
        </button>
      </div>

      <div className="mt-6 text-center">
        <div className="text-primary text-xl">
          Swipe right if your heart says yes, left if it whispers no.
        </div>
      </div>
    </div>
  );
};

export default Swipe;
