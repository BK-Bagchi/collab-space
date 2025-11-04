import { useContext } from "react";
import ActiveContext from "../context/ActiveContext";

export const useActive = () => useContext(ActiveContext);
