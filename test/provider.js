import BaaSClient from "../lib/client/BaaSClient";

let client = new BaaSClient("5Ka9YjFQtfUUX2DdnqkaPWH1rVeSeby7Cj2VdjRt79S9kKLvXR7", "1.2.19");
client.getProviderInfo().then(info => {
    console.log(info);
}).catch(ex => {
    console.log("error when get provider info", ex);
});
