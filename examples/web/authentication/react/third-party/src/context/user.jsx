import { createContext, useReducer, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = createContext(null);

const reducer = (state, action) => { 
    switch (action.type) {
        case 'LOGIN':
            return action.payload;
        case 'LOGOUT':
            return null;
        default:
            return state;
    }
}



// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => { 
    const [state, dispatch] = useReducer(reducer, null);
    const { user, isAuthenticated,getAccessTokenSilently } = useAuth0();


    const getCustomTokenCallback = async () => {
        const auth0Token = await getAccessTokenSilently();
        const baseDomain = import.meta.env.VITE_AUTH_FUNCTION_DOMAIN || "";
        const resp = await fetch( baseDomain + "/server/auth0_function/authorize", {
          headers: {
            "zc-customauth": auth0Token
          }
        });
        const data = await resp.json();
        return data;
    };
    
    useEffect(() => {
        const getUser = async () => {
            // Since this is a third party authentication, we need to get the custom token from the server
            if (user) {
                await window.catalyst.auth.signinWithJwt(getCustomTokenCallback);
                try {
                    const userDetails = await window.catalyst.auth.isUserAuthenticated();
                    return userDetails?.content ? loginUser(userDetails.content) : null;
                } catch (err) {
                    console.log(err);
                }
            }
        }
        getUser();
    }, [user, isAuthenticated]);

    const loginUser = (user) => dispatch({ type: 'LOGIN', payload: user });
    const logoutUser = () => dispatch({ type: 'LOGOUT' });
    const getUserDetails = () => state;

    const value = { loginUser, logoutUser, getUserDetails };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const useUser = () => { 
    const context = useContext(UserContext);
    if (context === undefined) { 
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
export { UserProvider, useUser };
