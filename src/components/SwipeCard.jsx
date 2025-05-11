import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useProductContext } from "../context/ProductContext";
import { useState } from "react";
import "../App.css";

export default function SwipeCard({ product, isTop, index }) {
  const { dispatch } = useProductContext();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const [isAnimating, setIsAnimating] = useState(false);

  const swipeThreshold = 100;
  const velocityThreshold = 500;

  const handleSwipe = (dir) => {
    if (dir === "right") {
      dispatch({ type: "LIKE_PRODUCT", payload: product });
    } else if (dir === "left") {
      dispatch({ type: "DISLIKE_PRODUCT", payload: product });
    } else if (dir === "up") {
      dispatch({ type: "ADD_TO_CART", payload: product });
    }
  };

  const animateOffscreen = (dir) => {
    setIsAnimating(true);
    if (dir === "right") {
      animate(x, 1000, {
        onComplete: () => handleSwipe("right"),
      });
    } else if (dir === "left") {
      animate(x, -1000, {
        onComplete: () => handleSwipe("left"),
      });
    } else if (dir === "up") {
      animate(y, -1000, {
        onComplete: () => handleSwipe("up"),
      });
    }
  };

  const cardStyle = {
    zIndex: 100 - index,
    scale: 1 - index * 0.03,
    translateY: index * 10,
    backgroundImage: `url(${product.imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <motion.div
      className="swipe-card"
      style={{
        ...cardStyle,
        x,
        y,
        rotate,
      }}
      drag={isTop && !isAnimating ? true : false}
      dragElastic={0.3}
      dragMomentum={false}
      onDragEnd={(e, info) => {
        if (!isTop || isAnimating) return;

        const { offset, velocity } = info;
        const { x: offsetX, y: offsetY } = offset;
        const { x: velocityX, y: velocityY } = velocity;

        if (offsetX > swipeThreshold || velocityX > velocityThreshold) {
          animateOffscreen("right");
        } else if (
          offsetX < -swipeThreshold ||
          velocityX < -velocityThreshold
        ) {
          animateOffscreen("left");
        } else if (
          offsetY < -swipeThreshold ||
          velocityY < -velocityThreshold
        ) {
          animateOffscreen("up");
        } else {
          animate(x, 0);
          animate(y, 0);
        }
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="product-info overlay">
        <h2 className="product-name clamp-2-lines">{product.name}</h2>
        <p className="product-brand clamp-2-lines">{product.brand}</p>
        <p className="product-price">
          ₹{product.price}
          <span className="original">₹{product.originalPrice}</span>
          <span className="discount">{product.discountPercentage}% OFF</span>
        </p>
      </div>
    </motion.div>
  );
}
