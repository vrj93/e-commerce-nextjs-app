const ProductPrice = ({ price }: any) => {
  return (
    <div className="w-2/3 py-2 border-b border-gray-300">
      <p className="text-2xl font-medium text-gray-900">
        <span className="text-sm">&#8377;</span>
        {price}
      </p>
    </div>
  );
};

export default ProductPrice;
