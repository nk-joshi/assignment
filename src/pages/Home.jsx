import { useEffect } from "react";
import CardStack from "../components/CardStack";
import { useProductContext } from "../context/ProductContext";
import products from "../data/productData.json";

export default function Home() {
  const { dispatch } = useProductContext();

  useEffect(() => {
    dispatch({ type: "SET_PRODUCTS", payload: products });
  }, []);

  return (
    <div className="flex-center">
      <CardStack />
    </div>
  );
}
