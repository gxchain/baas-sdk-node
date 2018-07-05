import BaaSClient from "../lib/client/BaaSClient";

let client = new BaaSClient("5JnDdu5s4jFeQ7Kqovgdcae5t1spodJFPuJzs4Xpd88Grhx8GGV", "1.2.61", "https://baas-developer.gxchain.cn/api");
client.data("QmaZrwThXyZm8Rxs93Tih3L6p4Q8NqYEXp32iN4PeAqDgv").then(resp => {
    console.log(resp);
}).catch(ex => {
    console.error("error when invoke data method:", ex);
});
