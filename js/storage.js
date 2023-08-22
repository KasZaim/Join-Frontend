/** 
 * Constant that holds the storage token.
 * @type {string}
 */
const STORAGE_TOKEN = 'HQADTBPLSZBKBQ2U1VHI24V2GU5OCLJY2VIEN5IG';


/** 
 * Constant that holds the URL of the remote storage.
 * @type {string}
 */
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


/**
 * Async function to set an item in the remote storage.
 * This function sends a POST request to the remote storage.
 * @param {string} key - The key of the item.
 * @param {string} value - The value of the item.
 * @returns {Promise<object>} The response from the server in JSON format.
 * @throws {Error} If the server responds with a status that is not ok.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}


/**
 * Async function to get an item from the remote storage.
 * This function sends a GET request to the remote storage.
 * @param {string} key - The key of the item to fetch.
 * @returns {Promise<string|number|object|Array|boolean|null|undefined>} The value of the item.
 * @throws {Error} If the server responds with a status that is not ok, or if the key does not exist.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}