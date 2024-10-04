const ProductAbout = ({ description }: any) => {
  return (
    <div className="w-2/3 my-4">
      <h2 className="w-full text-left font-bold">About the item</h2>
      <div
        className="w-full text-left"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </div>
  );
};

export default ProductAbout;
