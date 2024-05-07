'use client';

import {useEffect, useState, Fragment} from "react";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {useRouter} from "next/navigation";
import {useAppSelector} from "@/store";

const Navbar = () => {
    const router = useRouter();

    const [authState, setAuthState] = useState(false); //storing Redux state to normal State for mitigating client/server state mismatch on reload.
    const reduxAuthState = useAppSelector((state) => state.auth.authState);
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

    useEffect(() => {
        fetchLocation();
        fetchCategories();
    }, []);

    useEffect(() => {
        setAuthState(reduxAuthState);
    }, [reduxAuthState]);

    const handleSearch = () => {
        const searchStr = Buffer.from(JSON.stringify({
            name: searchText,
            categoryId: [selectedCategory.id],
        })).toString('base64');

        router.push(`/product?search=${searchStr}`);
    }

    // @ts-ignore
    return (
        <nav className='bg-gray-900 flex w-full items-center justify-center space-x-10 py-2'>
            {/*logo*/}
            <a href='#' onClick={() => router.push('/')}><h2 className='text-xl text-stone-400 font-bold'>eCommerce</h2></a>
            {/*location*/}
            <div className="flex flex-col">
                <span className='text-xs text-stone-200 font-normal'>Delivering to</span>
                <span className='text-sm text-stone-200 font-bold'>{location.city}</span>
                <span className='text-sm text-stone-200 font-bold'>{location.country}</span>
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
                                                        onClick={(e) => setSelectedCategory({
                                                            id: category.id,
                                                            name: category.name
                                                        })}
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
                <div className='items-center'>
                    <input type='text'
                           name='search'
                           className='h-10 pl-2 w-96 text-sm'
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
                        <svg className="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
            {/*signin signup option*/}
            <div className='flex p-0 items-center'>
                <div className="mx-auto flex w-full items-center justify-center">
                    <div className="group relative cursor-pointer ml-10">
                        <div className="flex items-center justify-between space-x-5">
                            <a className="menu-hover text-base font-medium text-white lg:mx-4">
                                <div className="flex flex-col">
                                    <span className='text-xs text-stone-200'>Hello, {
                                        authState ? 'Vivek' : 'Sign in'
                                    }</span>
                                    <span className='text-stone-200'>Account</span>
                                </div>
                            </a>
                            <div className='' style={{'margin-left': '0px'}}>
                                <span className='text-stone-200'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 3"
                                         strokeWidth="1.5"
                                         stroke="white" className="h-6 w-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 5l-5 5-5-5"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div
                            className="invisible absolute right-0 z-50 flex w-56 flex-col text-center bg-gray-100 py-1 pt-2 px-4 text-gray-800 shadow-xl group-hover:visible">
                            {
                                !authState &&
                                <div className='mb-2 border-b-2 p-0'>
                                    <a href='#' className="mt-2 block border-b border-gray-100 pt-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                                        <button type='button'
                                                className='py-2 px-10 bg-yellow-500 hover:bg-yellow-700 text-white text-sm rounded-xl'
                                                onClick={() => router.push('/signin')}
                                        >
                                            Sign in
                                        </button>
                                    </a>
                                    <span className='text-xs mb-2'>
                                        New customer?
                                        <a href='#' className='text-blue-700' onClick={() => router.push('/signup')}>Start here</a>
                                    </span>
                                </div>
                            }
                            <a className="block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                                Account
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/*Order & Return*/}
            <div className='flex p-0 items-center justify-between space-x-5' style={{ 'margin-left': '15px' }}>
                <a href='#' className="text-base font-medium text-white lg:mx-4" onClick={() => router.push('/order')}>
                    <div className="flex flex-col">
                        <span className='text-xs text-stone-200'>Returns</span>
                        <span className='text-stone-200'>& Orders</span>
                    </div>
                </a>
            </div>

            {/*Cart*/}
            <div className='flex p-0 items-center' style={{ 'margin-left': '20px' }}>
                <a href='#' className='flex' onClick={() => router.push('/cart')}>
                    <div className='flex flex-col p-0 m-0'>
                        <span className='text-center text-orange-500 text-xs font-bold' style={{ 'margin': '0 0 0 10px' }}>0</span>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink"
                             data-name="Layer 1" viewBox="0 0 128 128" width="35" height="35" style={{ 'margin-top': '-8px' }}>
                            <defs>
                                <linearGradient id="a" x1="57.791" x2="68.393" y1="100.585" y2="111.187"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stopColor="#f15550" className="stopColorf15550 svgShape"></stop>
                                    <stop offset=".302" stopColor="#e0404b" className="stopColore0404b svgShape"></stop>
                                    <stop offset=".734" stopColor="#cd2845" className="stopColorcd2845 svgShape"></stop>
                                    <stop offset="1" stopColor="#c61f43" className="stopColorc61f43 svgShape"></stop>
                                </linearGradient>
                                <linearGradient id="c" x1="96.699" x2="107.301" y1="100.585" y2="111.187"
                                                href="#a"></linearGradient>
                                <linearGradient id="d" x1="54.317" x2="103.693" y1="106.735" y2="78.227"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stopColor="#fbac46" className="stopColorfbac46 svgShape"></stop>
                                    <stop offset="1" stopColor="#d38b23" className="stopColord38b23 svgShape"></stop>
                                </linearGradient>
                                <linearGradient id="e" x1="53.858" x2="95.856" y1="9.632" y2="82.375"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stopColor="#fcea73" className="stopColorfcea73 svgShape"></stop>
                                    <stop offset=".249" stopColor="#fce670" className="stopColorfce670 svgShape"></stop>
                                    <stop offset=".508" stopColor="#fcd967" className="stopColorfcd967 svgShape"></stop>
                                    <stop offset=".769" stopColor="#fbc558" className="stopColorfbc558 svgShape"></stop>
                                    <stop offset="1" stopColor="#fbac46" className="stopColorfbac46 svgShape"></stop>
                                </linearGradient>
                                <linearGradient id="b" x1="61.325" x2="64.86" y1="104.119" y2="107.654"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stopColor="#ffffff" className="stopColorfff svgShape"></stop>
                                    <stop offset="1" stopColor="#d7d7d7" className="stopColord7d7d7 svgShape"></stop>
                                </linearGradient>
                                <linearGradient id="f" x1="100.232" x2="103.768" y1="104.119" y2="107.654"
                                                href="#b"></linearGradient>
                                <linearGradient id="g" x1="20.877" x2="20.877" y1="14.565" y2="29.774"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stopColor="#fd908d" className="stopColorfd908d svgShape"></stop>
                                    <stop offset="1" stopColor="#ec4547" className="stopColorec4547 svgShape"></stop>
                                </linearGradient>
                            </defs>
                            <circle cx="63.092" cy="105.886" r="7.5" fill="url(#a)"></circle>
                            <circle cx="102" cy="105.886" r="7.5" fill="url(#c)"></circle>
                            <path fill="url(#d)"
                                  d="M53.234 99.346a5.511 5.511 0 0 1-4.155-9.132l8.841-10.152a7.356 7.356 0 0 1 4.554-2.462l15.9-1.809a3.8 3.8 0 0 1 .514-.037 3.678 3.678 0 0 1 2.9 5.9 3.651 3.651 0 0 1-2.431 1.416l-15.9 1.808L57.272 92h52.251a3.675 3.675 0 0 1 0 7.349Z"></path>
                            <path fill="url(#e)"
                                  d="M117.19 43.942a1.994 1.994 0 0 0-1.356-.746l-78.282-7.574a29.857 29.857 0 0 0-8.832-11.476l-2.387 3.21c4.744 3.528 7.267 9.105 7.975 10.861L49.165 76.8a5.671 5.671 0 0 0 5.978 3.593l54.706-6.623a5.664 5.664 0 0 0 4.952-4.953l2.826-23.388a1.994 1.994 0 0 0-.437-1.487Zm-5.574 17.891-3.24.177-.644-6.37 4.634-.02Zm-54.934-5.974 7.254-.031 1.927 8.5-7.007.382Zm-1.89 9.074L49 65.249l-3.6-9.342 7.16-.031ZM94.36 51.7l-5.977.026-1.325-7.292 6.433.622Zm3.217-6.248 5.155.5.577 5.711-4.917.021ZM78.663 55.765l6.383-.027 1.354 7.471-6.292.343Zm-2.578 8.007-6.171.337-1.881-8.3 6.565-.028Zm13.024-8.052 5.774-.025.916 7-5.37.293Zm-4.789-3.98-6.4.028-1.557-8.368 6.557.634Zm-10.465.045-6.728.029-2.157-9.52 7.251.7Zm-10.825.047-7.33.031-2.633-10.721 7.709.746Zm3.73 16.455 1.471 6.491-6.7.812-1.7-6.924Zm4.051-.221 6.011-.328 1.091 5.868-5.691.689Zm10.038-.548 6.275-.342.945 5.2-6.177.748Zm10.3-.562 5.17-.282.606 4.63-4.879.591Zm9.176-.5 4.454-.243.413 4.091-4.3.52Zm-.52-3.978-.89-6.8 4.8-.021.664 6.571Zm13.045-10.86-5.521.024-.536-5.3 6.617.64Zm-64-10.884 2.738 11.147-7.717.033L39.2 39.8Zm5.812 35.686a1.681 1.681 0 0 1-1.762-1.061l-2.382-6.186 5.248-.286 1.765 7.186Zm54.706-6.62-.2.025-.387-3.828 2.35-.128-.3 2.469a1.672 1.672 0 0 1-1.463 1.462Z"></path>
                            <circle cx="63.092" cy="105.886" r="2.5" fill="url(#b)"></circle>
                            <circle cx="102" cy="105.886" r="2.5" fill="url(#f)"></circle>
                            <path fill="url(#g)"
                                  d="M25.879 29.774a1.012 1.012 0 0 1-.478-.12l-11.6-6.31a4.643 4.643 0 0 1-2.25-2.782 4.675 4.675 0 0 1 6.717-5.431l11.6 6.31a1 1 0 0 1 .4 1.356l-3.511 6.457a1.018 1.018 0 0 1-.878.52Z"></path>
                        </svg>
                    </div>

                    <span className='text-center text-stone-200 pt-4'>Cart</span>
                </a>
            </div>
        </nav>
    );
}

export default Navbar;