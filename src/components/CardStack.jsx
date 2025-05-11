import SwipeCard from "./SwipeCard";
import { useProductContext } from "../context/ProductContext";
import "../App.css";

export default function CardStack() {
  const { state } = useProductContext();
  const products = state.products;

  return (
    <div className="card-stack">
      {products.length > 0 ? (
        products
          .slice(0, 3)
          .map((product, index) => (
            <SwipeCard
              key={product.id}
              product={product}
              index={index}
              isTop={index === 0}
            />
          ))
      ) : (
        <div className="end-of-list">
          <h2>🎉 You've reached the end!</h2>
          <p>Come back later for more products.</p>
        </div>
      )}
    </div>
  );
}
