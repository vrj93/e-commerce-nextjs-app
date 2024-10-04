const ProductTitle = ({ product }: any) => {
  return (
    <div className="w-2/3 py-2 border-b border-gray-300">
      <div className="w-full">
        <h1 className="text-2xl font-medium">{product.name}</h1>
      </div>
      <div className="w-full">
        <span className="text-sm text-blue-400 font-medium">
          Visit the {product.brand?.name} store
        </span>
      </div>
      {/* <div>Review</div> */}
    </div>
  );
};

export default ProductTitle;
