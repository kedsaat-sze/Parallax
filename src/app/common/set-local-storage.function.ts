export function setLocalStorage(client: string, name: string) {
    if (name !== "") {
        const oldName = localStorage.getItem("name")
        if (oldName !== name) {
            localStorage.setItem("name", name);
        }
    }
    if (client !== "") {
        const oldClient = localStorage.getItem("client")
        if (oldClient !== client) {
            localStorage.setItem("client", client);
        }
    }
}