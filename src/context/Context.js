import { createContext } from "react";

const AppStateContext = createContext(null);
const userFromDBContext = createContext(null);

export { AppStateContext, userFromDBContext };
