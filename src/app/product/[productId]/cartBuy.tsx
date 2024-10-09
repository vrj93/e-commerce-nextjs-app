import Quantity from "./quantity";

const CartBuy = ({ product, productQuantity, setProductQuantity }: any) => {
  return (
    <div className="w-full md:w-1/3 flex justify-center md:justify-start items-start">
      <div className="w-full md:w-[85%] h-auto p-3 border border-gray-300">
        <div className="w-full md:w-2/3 py-2 text-center md:text-left">
          <p className="text-2xl md:text-3xl font-medium text-gray-900">
            <span className="text-sm">&#8377;</span>
            {product.price}
          </p>
        </div>
        <Quantity
          productQuantity={productQuantity}
          setProductQuantity={setProductQuantity}
        />
        <button
          type="submit"
          className="flex w-full justify-center rounded-full bg-yellow-500 px-4 py-2 my-3 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add to Cart
        </button>
        <button
          type="submit"
          className="flex w-full justify-center rounded-full bg-orange-400 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default CartBuy;
