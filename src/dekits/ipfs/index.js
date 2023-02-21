import { encode as base64_encode } from "base-64";
import {
  REACT_APP_INFURA_PROJECT_ID,
  REACT_APP_INFURA_PROJECT_SECRET,
} from "../../const/common.const";
// const IPFS = require("ipfs-api");
import { create } from "ipfs-http-client";
let secrets =
  REACT_APP_INFURA_PROJECT_ID + ":" + REACT_APP_INFURA_PROJECT_SECRET;

let encodedSecrets = base64_encode(secrets);
const ipfs = new create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    Authorization: "Basic " + encodedSecrets,
  },
});

export default ipfs;
