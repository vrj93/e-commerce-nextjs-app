import Link from "next/link";

const Order = () => {
  return (
    <div className="md:items-center lg:items-center hidden md:block lg:block">
      <Link
        href="/order"
        className="flex flex-col text-base font-medium text-white"
      >
        <span className="text-xs text-stone-200">Returns</span>
        <span className="text-stone-200">& Orders</span>
      </Link>
    </div>
  );
};

export default Order;
