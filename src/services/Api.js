import config from "../config";

export default class Api {
    constructor() {
        this.config = config;
    }

    apiConfig = {
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *omit
        headers: {
            "user-agent": "Mozilla/4.0 MDN Example",
            "content-type": "application/json"
        },
        mode: "cors", // no-cors, *same-origin
        redirect: "follow", // *manual, error
        referrer: "no-referrer", // *client
    };

    post(url, data, token = false) {
        var config = {
            method: "POST",
            body: JSON.stringify(data)
        };

        if(token) {
            this.apiConfig.headers = {
                Authorization: `Bearer ${token}`,
                ...this.apiConfig.headers
            };
        }

        return this.send(url, {
            ...config,
            ...this.apiConfig
        });
    }

    get(url, token = false) {
        let config = {
            method: "GET",
        };

        if(token) {
            this.apiConfig.headers = {
                Authorization: `Bearer ${token}`,
                ...this.config.headers
            };
        }

        return this.send(url, {
            ...config,
            ...this.apiConfig
        });
    }

    send(url, config) {
        console.log("api config", config);
        let qualifiedUrl = this.config.apiUrl + url;
        return fetch(qualifiedUrl, config)
            .then(response => response.json());
    }
}