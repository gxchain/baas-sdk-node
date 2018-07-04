import {Aes} from "gxbjs";

/**
 * 加密消息体
 * @param params
 * @param private_key
 * @param public_key
 * @returns {string}
 */
export const encrypt_params = function (params, private_key, public_key, nonce) {
    let msg = JSON.stringify(params);
    return Aes.encrypt_with_checksum(private_key, public_key, nonce || "", new Buffer(msg, "utf-8")).toString("hex");
};

/**
 * 解密消息体
 * @param msg
 * @param private_key
 */
export const decrypt_msg = function (msg, private_key, public_key_string, nonce) {
    let descrypted_msg = Aes.decrypt_with_checksum(private_key, public_key_string || private_key.toPublicKey().toPublicKeyString(), nonce || "", new Buffer(msg, "hex")).toString("utf-8");
    return descrypted_msg;
};


