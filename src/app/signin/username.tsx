import {useState} from "react";

const Username = ({ setUser, usernameError, setUsernameError }) => {

    const isValidPhone = (phone: string) => {
        if (!isNaN(Number(phone))) {
            const numberString = String(phone);
            return numberString.length === 10;
        } else {
            return false;
        }
    }

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleUsername = (e: { target: { value: string; }; }) => {
        if (isValidPhone(e.target.value)) {
            setUser(e.target.value);
            setUsernameError(false);
        } else if (isValidEmail(e.target.value)) {
            setUser(e.target.value);
            setUsernameError(false);
        } else {
            setUsernameError(true);
        }
    }

    return (
        <>
            <div>
                <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-900">
                    Phone or Email
                </label>
                <div className="mt-2">
                    <input
                        id="user"
                        name="user"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onBlur={handleUsername}
                    />
                    <label className={`text-sm text-red-500 ${!usernameError && 'hidden'}`}>Please enter valid Phone or Email</label>
                </div>
            </div>
        </>
    );
}

export default Username;
