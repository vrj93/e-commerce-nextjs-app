import Product from "./product";

const Products = ({ products }: any) => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product: any, index: number) => (
        <Product key={index} productStr={JSON.stringify(product)} />
      ))}
    </main>
  );
};

export default Products;
