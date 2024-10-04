const ProductBrandCatMnf = ({ product }: any) => {
  return (
    <div className="w-2/3 my-2">
      <table className="w-full border-collapse text-left">
        <tbody>
          <tr>
            <td className="py-2 font-bold border-b border-gray-200">Brand</td>
            <td className="py-2 border-b border-gray-200">
              {product.brand?.name}
            </td>
          </tr>
          <tr>
            <td className="py-2 font-bold border-b border-gray-200">
              Category
            </td>
            <td className="py-2 border-b border-gray-200">
              {product.category?.name}
            </td>
          </tr>
          <tr>
            <td className="py-2 font-bold border-b border-gray-200">
              Manufacturer
            </td>
            <td className="py-2 border-b border-gray-200">
              {product.manufacturer}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductBrandCatMnf;
