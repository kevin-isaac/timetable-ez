import {useEffect} from "react";

const useConsole = (varName) => {
    const log=useEffect(function () {console.log(varName)},[varName]);

}

export default useConsole;