const Color = ({
  colors,
  visibleColors,
  selectedColors,
  toggleColor,
  showMoreColors,
}: any) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-medium mb-2">Color</h2>
      <ul>
        {colors &&
          colors.slice(0, visibleColors).map((color: any, index: number) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedColors?.includes(color.name) ? true : false}
                  onChange={(e) => toggleColor(e, color.name)}
                />
                {color.name}
              </label>
            </li>
          ))}
      </ul>
      {colors && colors.length > visibleColors && (
        <button onClick={showMoreColors} className="text-blue-500">
          See More
        </button>
      )}
    </div>
  );
};

export default Color;
