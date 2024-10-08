import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

const Category = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: any) => {
  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-l-md bg-stone-300 px-3 pt-3 pb-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-stone-400">
            {selectedCategory.name ? selectedCategory.name : "Category"}
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 pb-1 text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
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
                    <a
                      href="#"
                      className="text-gray-700 block px-2 text-sm"
                      onClick={(e) =>
                        setSelectedCategory({
                          slug: category.slug,
                          name: category.name,
                        })
                      }
                    >
                      {category.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Category;
