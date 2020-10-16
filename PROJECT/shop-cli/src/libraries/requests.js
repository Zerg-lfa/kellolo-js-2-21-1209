export function get(url) {
    return fetch(url).then(d => d.json())
}

export function post(url, item) {
    return fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    }).then(d => d.json())
}

export function put(url, payload) {
    return fetch(url, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).then(d => d.json())
}

export function del(url) {
    return fetch(url, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    }).then(d => d.json())
}
