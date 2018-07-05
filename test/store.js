import BaaSClient from "../lib/client/BaaSClient";

let client = new BaaSClient("5JnDdu5s4jFeQ7Kqovgdcae5t1spodJFPuJzs4Xpd88Grhx8GGV", "1.2.61", "https://baas-developer.gxchain.cn/api");
client.store("test").then(resp => {
    console.log(resp);
}).catch(ex => {
    console.error("error when invoke store method:", ex);
});
