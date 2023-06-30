import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { firebaseGetUsers } from "./firebase";

function checkIfUserExists(username, password, allUsers) {
    let checkUser = false;
    allUsers.forEach(user => {
        if (user.username === username) {
            checkUser = true;
            if (user.password === password) {
                localStorage.setItem('loggedIn', user.username)
                checkUser = true;
            }
            else {
                alert("Wrong password");
            }
        }
    })
    return checkUser
}
export function LoginFormComponent() {
    const usernameRef = useRef();
    const passwordRef = useRef();
   
    const queryClient = useQueryClient();
    const { data: allUsers, status } = useQuery(["allUsers"], firebaseGetUsers);

    const handleLogin = async e => {
        e.preventDefault();
        if (status === 'success') {
            let checkUser = checkIfUserExists(
                usernameRef.current.value,
                passwordRef.current.value,
                allUsers
            );
            if (checkUser == false) {
                alert("User not found");
            } else if (checkUser == true) {
                localStorage.setItem("loggedIn", usernameRef.current.value);
                queryClient.invalidateQueries(["allUsers"]);
            }
        }
    }
    return (
        <>

            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username</label>
                <input type="text"
                    name="username"
                    id="username"
                    required
                    ref={usernameRef}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    ref={passwordRef}
                />
                <button>Login</button>
            </form>
        </>
    )
}