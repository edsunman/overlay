
interface jsonData {
    [key: string] : number | string | boolean
}

export async function overlayFetch(route : string, method : string, data : jsonData ){

    const response = await fetch(route, {
            method: method,
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
                },
            body: JSON.stringify(data)
        })

    return await response.json();

}