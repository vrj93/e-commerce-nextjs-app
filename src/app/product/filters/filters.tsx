import Brand from "./brand";
import Category from "./category";
import Color from "./color";

const Filters = () => {
  return (
    <aside className="w-full md:w-[20%] lg:w-[20%] p-2 space-y-4">
      <Color />
      <Category />
      <Brand />
    </aside>
  );
};

export default Filters;
