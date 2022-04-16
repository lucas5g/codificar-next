import useSWR from "swr";
import { api } from "../services/api";

export function useFetch(url) {


    const { data, error } = useSWR(url, async() => {
        const { data } = await api.get(url)
        return data
    })

    return {
        data,
        error
    }

}