import axios from "axios";

export function requestGetAxios({ url, params }) {
    return new Promise((resolve, reject) => {
        axios.get(
            url,
            {
                params: params,
                headers: {
                    Authorization: process.env.REACT_APP_API_KEY
                }
            })
            .then((ress) => resolve(ress.data))
            .catch((err) => reject(err))
    })
}