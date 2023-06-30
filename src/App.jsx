import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react"
import { CreateUserPage } from "./childComponentsAndFirebase/createNewUser";
import { firebaseGetUsers } from "./childComponentsAndFirebase/firebase";
import { ListComponent } from "./theListFolder/listComponent";
import { LoginFormComponent } from "./childComponentsAndFirebase/loginFormComponent";

// localStorage.removeItem('loggedIn');

export function App() {
    const [loginIsVisible, setLoginIsVisible] = useState(true);
    const [createIsVisible, setCreateIsVisible] = useState(false);
    const handleClick = (loginOrCreate) => {
        if (loginOrCreate === 'login') {
            setLoginIsVisible(false);
            setCreateIsVisible(true)
        } else {
            setCreateIsVisible(false)
            setLoginIsVisible(true);
        };
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false); //Användaren är inte inloggad till en början
    const queryClient = useQueryClient();

    const seeIfLoggedIn = () => {
        if (
            localStorage.getItem("loggedIn") !== null 
        ) {
            setIsLoggedIn(true);    
        }
        else{
            setIsLoggedIn(false)
        }
    };
    
    const loginQuery = useQuery({
        queryKey: ["allUsers"],
        queryFn: firebaseGetUsers,
        refetchInterval: seeIfLoggedIn,
    });

    useEffect(() => {
        if (isLoggedIn) {
            queryClient.invalidateQueries("allUsers");
        }
    }, [isLoggedIn, queryClient]);

    if (isLoggedIn) {
        return (
            <ListComponent />
        )
    } else {
        return (
            <div>
                <button className={loginIsVisible ? 'btn' : 'hide'}
                    onClick={() =>
                        handleClick('login')
                    }
                >
                    Create new user
                </button>
                <button
                    className={createIsVisible ? 'btn' : 'hide'}
                    onClick={() => handleClick('create')
                    }
                >
                    Back to login
                </button>
                <div className={loginIsVisible ? 'loginContainer' : 'hide'} >
                    <LoginFormComponent />
                </div>
                <div className={createIsVisible ? 'createContainer' : 'hide'} >
                    <CreateUserPage />
                </div>
            </div>
        )
    }

}