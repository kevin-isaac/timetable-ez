import { createContext,useContext,useState } from "react";

const UserContext = createContext(undefined);

function UserProvider(children){
    const [user,setUser] = useState({
        name:"Kevin Isaac",
        email:"kevin.izaac@gmail.com",
        id:"8121078"
    });

    return <UserContext.Provider value={{user,setUser}}>{children.children}  </UserContext.Provider>
}

export const useUser = () => useContext(UserContext);


export {UserProvider};