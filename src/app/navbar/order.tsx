import { useRouter } from "next/navigation";

const Order = () => {
  const router = useRouter();
  return (
    <div
      className="flex p-0 ml-[15px] items-center justify-between space-x-5"
    >
      <a
        href="#"
        className="text-base font-medium text-white lg:mx-4"
        onClick={() => router.push("/order")}
      >
        <div className="flex flex-col">
          <span className="text-xs text-stone-200">Returns</span>
          <span className="text-stone-200">& Orders</span>
        </div>
      </a>
    </div>
  );
};

export default Order;
