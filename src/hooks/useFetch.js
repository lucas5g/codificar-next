import useSWR from "swr";
import { api } from "../services/api";

export function useFetch(url) {


    const { data, error } = useSWR(url, async() => {
        if (url.includes('undefined')) {
            return
        }
        const { data } = await api.get(url)
        return data
    }, {
        // refreshInterval: 10000
    })

    return {
        data,
        error
    }

}