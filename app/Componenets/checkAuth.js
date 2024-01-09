'use client';
import NavBar from "./navBar";
import { useEffect, useState } from "react";
import { UserAuth } from "../FireBase/authContext";
import LogIn from "./logIn";

export default function CheckAuth(props) {

    const [loading, setLoading] = useState(true);
    const { user, googleSignIn, logOut } = UserAuth();

    useEffect(() => {
        const checkAuth = async () => {
            await new Promise((res) => setTimeout(res, 50));
            setLoading(false);
        };
        checkAuth();
    }, [user])

    return (
        <div>
            {
                !loading && !user ?
                <>
                    <LogIn/>
                </>
                :
                !loading && user ?
                    <>
                        <div>
                            <NavBar />
                        </div>
                        <div className='mt-40'>
                            {props.children}
                        </div>
                    </>
                :
                null
            }
        </div>
    )
}