import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { firebaseCreateUser } from "./firebase";

export function CreateUserPage() {
    const newUsernameRef = useRef();
    const newPasswordRef = useRef();
    const verifyNewPasswordRef = useRef();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const queryClient = useQueryClient();
    useEffect(() => {
        if (isLoggedIn) {
            queryClient.invalidateQueries("allUsers");
        }
    }, [isLoggedIn, queryClient]);


    return (
        <>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (verifyNewPasswordRef.current.value === newPasswordRef.current.value){
                        const newUser = {
                            username: newUsernameRef.current.value,
                            password: newPasswordRef.current.value
                        }
                        firebaseCreateUser(newUser)
                        setIsLoggedIn(true)
                        localStorage.setItem('loggedIn', newUser.username)
                    }else{
                        alert('Wrong password')
                    }
                }}
            >
                <label htmlFor="createUsername">Create username</label>
                <input type="text"
                    name="createUsername"
                    id="createUsername"
                    required
                    ref={newUsernameRef}
                />
                <label htmlFor="createPassword">Create password</label>
                <input type="password"
                    name="createPassword"
                    id="createPassword"
                    required
                    ref={newPasswordRef}
                />
                <label htmlFor="verifyPassword">Create password</label>
                <input type="password"
                    name="verifyPassword"
                    id="verifyPassword"
                    required
                    ref={verifyNewPasswordRef}
                />
                <button>Create user</button>
            </form>
        </>
    )
}