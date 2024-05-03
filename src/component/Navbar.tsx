'use client';

import {useEffect, useState, Fragment} from "react";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {useRouter} from "next/navigation";

const Navbar = () => {
    const router = useRouter();
    const [
        location,
        setLocation
    ] = useState({city: '', country: ''});
    const [selectedCategory, setSelectedCategory] = useState({id: null, name: ''});
    const [categories, setCategories] = useState([]);
    const [searchText, setSearchText] = useState('');

    const classNames = (...classes: string[]) => {
        return classes.filter(Boolean).join(' ')
    }

    const fetchLocation = async () => {
        // const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/location`;
        const url = '';
        const res = await fetch(url);
        const response = await res.json();

        setLocation({
            city: response.data.city,
            country: response.data.country
        })
    }

    const fetchCategories = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/category`;
        const res = await fetch(url);
        const response = await res.json();

        setCategories(response);
    }

    useEffect(  () => {
        fetchLocation();
        fetchCategories();
    }, []);

    const handleSearch = () => {
        const searchStr = Buffer.from(JSON.stringify({
            name: searchText,
            categoryId: [selectedCategory.id],
        })).toString('base64');

        router.push(`/product?search=${searchStr}`);
    }

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <nav>
            <div className='bg-black flex items-center space-x-10 w-full mb-16 py-3 px-4'>
                {/*logo*/}
                <h2 className='text-xl text-stone-400 font-bold'>eCommerce</h2>
                {/*location*/}
                <div className="flex flex-col">
                    <span className='text-xs text-white font-normal'>Delivering to</span>
                    <span className='text-sm text-white font-bold'>{location.city}</span>
                    <span className='text-sm text-white font-bold'>{location.country}</span>
                </div>

                <div className='flex p-0 items-center'>
                    {/*category*/}
                    <div className='flex items-center'>
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button
                                    className="inline-flex w-full justify-center gap-x-1.5 rounded-l-md bg-stone-300 px-3 pt-3 pb-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-stone-400">
                                    {selectedCategory.name ? selectedCategory.name : 'Category'}
                                    <ChevronDownIcon className="-mr-1 h-5 w-5 pb-1 text-gray-400" aria-hidden="true"/>
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
                                <Menu.Items
                                    className="absolute left-0 z-10 w-60 max-h-96 overflow-y-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {
                                            categories.map((category, index) => (
                                                <Menu.Item key={index}>
                                                    {({active}) => (
                                                        <a
                                                            href="#"
                                                            className='text-gray-700 block px-2 text-sm'
                                                            onClick={(e) => setSelectedCategory({id: category.id, name: category.name})}
                                                        >
                                                            {category.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))
                                        }
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>

                    {/*search bar*/}
                    <div className='flex items-center'>
                        <input type='text'
                               name='search'
                               className='h-10 px-3 max-w-96'
                               placeholder='Search Products'
                               onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>

                    {/*search button*/}
                    <div className='flex items-center'>
                        <button type="submit"
                                className="absolute p-3 text-sm font-medium text-white bg-yellow-500 rounded-e-md hover:bg-yellow-700 focus:ring-2 focus:outline-none focus:ring-yellow-200 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700"
                                onClick={handleSearch}
                            >
                            <svg className="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>


                </div>
            </div>
        </nav>
    );
}

export default Navbar;