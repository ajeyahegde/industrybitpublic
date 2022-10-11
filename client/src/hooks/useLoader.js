import { useState } from "react"
import Loader from "src/components/Loader"


const useLoader = () => {
    const [isLoading, setisLoading] = useState(false)

    return [
        isLoading ? <Loader></Loader> : null,
        () => setisLoading(true),
        () => setisLoading(false),
    ]
}

export default useLoader;