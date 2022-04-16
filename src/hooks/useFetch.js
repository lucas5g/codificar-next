import useSWR from "swr";
import { api } from "../services/api";

export function useFetch(url) {


    const { data, error } = useSWR(url, async() => {
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