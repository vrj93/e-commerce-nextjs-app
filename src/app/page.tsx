import ByCategory from "@/app/product/dashboard/byCategory";
import ByBrand from "@/app/product/dashboard/byBrand";

const Page = () => {
  return (
    <div className="flex flex-col w-full">
      <ByCategory />
      <ByBrand />
    </div>
  );
};

export default Page;
