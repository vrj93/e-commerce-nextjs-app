'use client'

import {useRouter} from "next/navigation";
import {useAppSelector} from "@/store";

const Page = () => {
    const router = useRouter();
    const reduxAuthState = useAppSelector((state) => state.auth.authState);

    if (!reduxAuthState) {
        router.push('/signin')
    }

    return (
        <>
            <div className=''>This is Cart Page</div>
        </>
    )
}

export default Page;