export const isEmpty = (obj) => {
    return Object.keys(obj).length===0;
}

export const fetcher = async (url) => await fetch(url).then((res) => res.json());