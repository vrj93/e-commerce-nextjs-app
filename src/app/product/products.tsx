import { useContext } from "react";
import Product from "./product";
import { FilterContext } from "./context/filterContext";

const Products = () => {
  const { searchText, products } = useContext(FilterContext);
  return (
    <div className="w-full md:w-[80%] lg:w-[80%] p-2">
      <span className="inline-block italic mb-4">{`Search: "${searchText}"`}</span>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-4 md:gap-x-6 md:gap-y-8 lg:gap-x-6 lg:gap-y-8">
        {products.map((product: any, index: number) => (
          <Product key={index} productStr={JSON.stringify(product)} />
        ))}
      </div>
    </div>
  );
};

export default Products;
