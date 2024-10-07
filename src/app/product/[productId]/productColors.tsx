const ProductColors = ({
  colors,
  selectedColorId,
  setSelectedColorId,
}: any) => {
  return (
    <div className="my-2">
      <h2 className="pb-2 text-left font-medium">Select Color</h2>
      <div className="pb-2 flex flex-wrap w-2/3">
        {colors?.map((color: any, index: number) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full m-2 ${
              selectedColorId == color.id
                ? "border-4 border-blue-600"
                : "border border-gray-600"
            } hover:cursor-pointer`}
            style={{ backgroundColor: color.name }}
            onClick={() => setSelectedColorId(color.id)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProductColors;
