'use client';
import {useAppSelector} from "@/store";
import {useRouter} from "next/navigation";

const Page = () => {
    const router = useRouter();
    const reduxAuthState = useAppSelector((state) => state.auth.authState);

    if (!reduxAuthState) {
        router.push('/signin')
    }

    return (
        <>
            <div className=''>This is Order Page</div>
        </>
    )
}

export default Page;