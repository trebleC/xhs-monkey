// import { GM_xmlhttpRequest } from "vite-plugin-monkey/dist/client";

// 封装GM_xmlhttpRequest函数
export const useFetch = (options) => {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: options.method || 'GET',
            url: options.url,
            headers: options.headers || { 'Content-Type': 'application/json' },
            data: JSON.stringify(options.data) || null,
            responseType: options.responseType || 'json',
            onload: function (response) {
                if (response.status >= 200 && response.status < 400) {
                    resolve(response.response);
                } else {
                    reject(response.response);
                }
            },
            onerror: function (response) {
                reject(response.response);
            }
        });
    });
}

export const prefix = 'http://localhost:8050'