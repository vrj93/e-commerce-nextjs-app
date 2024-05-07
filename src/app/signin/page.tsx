'use client';
import {useAppDispatch} from "@/store";
import {setAuthState} from "@/store/authSlice";
import {useEffect} from "react";

const Page = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {

    }, []);
    return (
        <>
            <div className=''>
                <h2>This is Sign in Page</h2>
                <button onClick={() => dispatch(setAuthState(true))}>Log in</button><br />
                <button onClick={() => dispatch(setAuthState(false))}>Log out</button>
            </div>
        </>
    )
}

export default Page;