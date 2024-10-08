import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

const Quantity = ({ productQuantity, setProductQuantity }: any) => {
  return (
    <div className="flex items-center mt-4">
      <Menu as="div" className="w-full relative inline-block text-left">
        <Menu.Button className="inline-flex w-full justify-between gap-x-1.5 rounded-full bg-stone-300 px-3 py-2 mb-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-stone-400">
          {`Quantity: ${productQuantity}`}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 pb-1 text-gray-400"
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
          <Menu.Items className="absolute z-10 w-full max-h-96 overflow-y-auto origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xl">
            <div className="py-1">
              {[...Array(10)].map((_, index) => (
                <Menu.Item key={index} className="text-gray-700 hover:text-gray-100 hover:bg-gray-700 block px-4 text-[16px]">
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={(e) =>
                        setProductQuantity(index+1)
                      }
                    >
                      {index+1}
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

export default Quantity;
