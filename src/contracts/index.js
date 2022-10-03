import { ethers } from "ethers";

import Contrats from "./contracts/97.json";

const supportChainId = 56;

const RPCS = {
    56: "https://bsc-dataseed.binance.org/",
    97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    4: "https://rinkeby.infura.io/v3/580d6de4d2694cbdbee111d2f553dbcc"
}

const providers = {
    56: new ethers.providers.JsonRpcProvider(RPCS[56]),
    97: new ethers.providers.JsonRpcProvider(RPCS[97]),
    4: new ethers.providers.JsonRpcProvider(RPCS[4])
    // 31337: new ethers.providers.JsonRpcProvider(RPCS[31337])
}

const ERCContract = (e) => {
    const result = new ethers.Contract(
        e, Contrats.token.abi, providers[supportChainId]
    )
    return result;
}
const presaleContract = new ethers.Contract(Contrats.presale.address, Contrats.presale.abi, providers[supportChainId]);

export {
    providers, ERCContract, presaleContract, Contrats
}