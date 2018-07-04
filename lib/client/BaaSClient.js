import superagent from "superagent";
import {ops, PrivateKey, Signature} from "gxbjs";
import {MD5} from "crypto-js";

const DEFAULT_TIMEOUT = 30 * 60 * 1000;

class BaaSClient {

    constructor(privateKey, account_id, baseURL = "https://baas.gxchain.cn") {
        this.privateKey = PrivateKey.fromWif(privateKey);
        this.account_id = account_id;
        this.baseURL = baseURL;
    }

    /**
     * Fetch provider information
     * @returns {Promise<any>}
     */
    getProviderInfo() {
        return new Promise((resolve, reject) => {
            superagent.get(`${this.baseURL}/api/storage/provider`).end((err, resp) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(resp.body);
                }
            });
        });
    }

    /**
     * Create data exchange request
     * @param data
     * @param asset_id
     * @returns {Promise<any>}
     */
    store(data, asset_id = "1.3.1") {
        return new Promise((resolve, reject) => {
            this.getProviderInfo().then(info => {
                let provider = info.data;
                let fee = info.fees.find(a => a.asset_id == asset_id);
                if (!fee) {
                    fee = info.fees[0];
                }
                let price_per_kbyte = fee.price_per_kbyte;
                let buffer = new Buffer(data);
                let price = buffer.length / 1024 * price_per_kbyte;
                let expiration = Math.floor((new Date().getTime() + DEFAULT_TIMEOUT) / 1000) * 1000;
                try {
                    let operation = {
                        from: this.account_id,
                        to: provider.account_id,
                        proxy_account: provider.account_id,
                        percentage: 0,
                        amount: {
                            amount: price,
                            asset_id: fee.asset_id
                        },
                        expiration: new Date(expiration),
                        // memo:'5c37400e6e71b9faec6974e7fc219e72',
                        memo: MD5(data).toString(),
                        signatures: []
                    };
                    let signature = Signature.signBuffer(ops.signed_proxy_transfer_params.toBuffer(operation), this.privateKey);

                    let reqBody = {
                        from: operation.from,
                        to: operation.to,
                        proxy_account: operation.proxy_account,
                        percent: operation.percentage,
                        amount: operation.amount.amount,
                        asset_id: operation.amount.asset_id,
                        expiration: Math.floor(expiration / 1000),
                        memo: operation.memo,
                        signatures: [
                            signature
                        ],
                        data: data
                    };

                    superagent.post(`${this.baseURL}/api/storage/store`).send(reqBody).end((err, resp) => {
                        if (err) {
                            reject(resp.body);
                        } else {
                            resolve(resp.body);
                        }
                    });
                } catch (ex) {
                    reject(ex);
                }
            });
        });
    }

    /**
     * Fetch data by content id
     * @param cid
     * @returns {Promise<any>}
     */
    data(cid) {
        return new Promise((resolve, reject) => {
            superagent.get(`${this.baseURL}/api/storage/data/${cid}`).end((err, resp) => {
                if (err) {
                    reject(resp.body);
                } else {
                    resolve(resp.body);
                }
            });
        });
    }
}

export default BaaSClient;
