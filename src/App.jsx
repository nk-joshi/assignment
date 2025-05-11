import { ProductProvider } from "./context/ProductContext";
import Home from "./pages/Home";
import "./App.css";

export default function App() {
  return (
    <ProductProvider>
      <Home />
    </ProductProvider>
  );
}
