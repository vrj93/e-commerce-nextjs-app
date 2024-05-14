'use client';
import {useAppDispatch} from "@/store";
import {setAuthState} from "@/store/auth/authSlice";
import {useEffect, useRef, useState} from "react";
import Username from "@/app/signin/username";
import Password from "@/app/signin/password";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {setUserName} from "@/store/auth/userSlice";

const Page = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [signInEnabled, setSigninEnabled] = useState(false);
    const mountCount = useRef(0);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`;
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user,
                password,
            })
        });

        const response = await res.json();

        if (response.flag) {
            dispatch(setAuthState(true));
            dispatch(setUserName(response.data.name));
            router.push('/');
        } else {
            alert('Username or Password is incorrect!');
        }
    }

    useEffect(() => {
        if (mountCount.current > 1 && !usernameError && !passwordError) {//Sign in button should remain disabled on initial mount.
            setSigninEnabled(true);
        } else {
            setSigninEnabled(false);
        }
        mountCount.current += 1;
    }, [user, password, usernameError, passwordError]);

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image src='/amzlogo2.svg' className="mx-auto h-20 w-auto" alt='AMZ Logo' width={0} height={0} />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                        <Username setUser={setUser} usernameError={usernameError} setUsernameError={setUsernameError} />
                        <Password setPassword={setPassword} passwordError={passwordError} setPasswordError={setPasswordError} />
                        <div>
                            <button
                                type="submit"
                                className={`flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${!signInEnabled && 'opacity-50'}`}
                             disabled={!signInEnabled}>
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={() => router.push('/signup')}>
                            Start here
                        </a>
                    </p>
                </div>
            </div>

            {/*<div className=''>*/}
            {/*    <h2>This is Sign in Page</h2>*/}
            {/*    <button onClick={() => dispatch(setAuthState(true))}>Log in</button><br />*/}
            {/*    <button onClick={() => dispatch(setAuthState(false))}>Log out</button>*/}
            {/*</div>*/}
        </>
    )
}

export default Page;