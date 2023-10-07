import React from 'react';
import {AuthContextProvider} from "~/context/auth-context";


function GlobalContext({children}: { children: React.ReactNode }) {
    return (
        <AuthContextProvider>{children}</AuthContextProvider>
    );
}

export default GlobalContext;