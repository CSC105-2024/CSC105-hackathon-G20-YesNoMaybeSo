import React, { useState, useRef } from "react";
import { useSpring, animated as a, config } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

interface CardData {
  id: number;
  text: string;
}

const initialCards: CardData[] = [
  { id: 1, text: "takoyaki" },
  { id: 2, text: "sushi" },
  { id: 3, text: "ramen" },
];

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
      className="absolute w-[300px] h-[400px] bg-white rounded-xl shadow-xl flex items-center justify-center text-2xl font-bold cursor-grab"
    >
      {card.text}
    </a.div>
  );
};

const Swipe: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [liked, setLiked] = useState<number[]>([]);
  const swipeFuncRef = useRef<null | ((dir: "left" | "right") => void)>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (cards.length === 0) {
      const timer = setTimeout(() => {
        navigate("/waitingresult");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [cards, navigate]);

  const handleSwipe = (dir: "left" | "right", id: number) => {
    if (dir === "right") {
      setLiked((prev) => [...prev, id]);
    }
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const triggerSwipe = (func: (dir: "left" | "right") => void) => {
    swipeFuncRef.current = func;
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-secondary">
      <div className="relative w-[300px] h-[400px] flex items-center justify-center mb-8">
        <button
          onClick={() => swipeFuncRef.current?.("left")}
          className="hidden md:flex absolute top-2/5 left-[-50%] z-10 border-3 border-accent text-accent sm:p-2 p-1 sm:ml-4 rounded-full"
        >
          <GoChevronLeft size={24} />
        </button>
        <div className="realative rounded-2xl w-full h-full bg-white shadow">
          <div className="absolute rounded-2xl w-full h-full bg-white rotate-12 shadow"></div>
          <div className="absolute rounded-2xl w-full h-full bg-white rotate-6 shadow"></div>
          <div className="absolute rounded-2xl w-full h-full bg-white rotate- shadow"></div>
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
          {cards.length === 0 && (
            <div className="absolute w-full h-full flex items-center justify-center text-lg text-gray-500 font-medium">
              All Done!!
            </div>
          )}
        </div>
        <button
          onClick={() => swipeFuncRef.current?.("right")}
          className="hidden md:flex absolute top-2/5 right-[-50%] z-10 border-3 border-accent text-accent sm:p-2 p-1 sm:ml-4 rounded-full"
        >
          <GoChevronRight size={24} />
        </button>
      </div>
      <div className="mt-6 text-center">
        <div className="text-primary text-xl">
          Swipe right if your heart says yes, left if it whispers no.
        </div>
        {/* <p className="text-gray-700 font-medium">Liked IDs:</p>
          <p>{liked.length ? liked.join(", ") : "none"}</p> */}
      </div>
    </div>
  );
};

export default Swipe;
