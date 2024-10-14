import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Fragment } from "react";

const Category = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: any) => {
  return (
    <Menu as="div" className="w-auto h-full relative text-left items-center hidden md:block lg:block">
      <Menu.Button className="flex justify-center h-full px-3 rounded-l-md bg-stone-300 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-stone-400 items-center">
        {selectedCategory.name ? selectedCategory.name : "Category"}
        <ChevronDownIcon
          className="-mr-1 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 w-60 max-h-96 overflow-y-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {categories.map((category: any, index: number) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <Link
                    href="#"
                    className="text-gray-700 block px-2 py-1 text-sm"
                    onClick={(e) =>
                      setSelectedCategory({
                        slug: category.slug,
                        name: category.name,
                      })
                    }
                  >
                    {category.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Category;
