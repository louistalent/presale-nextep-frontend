import React, {
    createContext,
    useContext,
    useReducer,
    useMemo,
    useCallback,
    useEffect,
} from "react";
import { ethers } from "ethers";
import {
    providers, ERCContract, presaleContract, Contrats
} from "../contracts";

import { delay, handleAlert, toBigNum, fromBigNum } from "../utils";
import { NotificationManager } from "react-notifications";

const locales = {
    "usa": require('../locales/en-US.json'),
    "france": require('../locales/fr-FR.json'),
};

const BlockchainContext = createContext();

export function useBlockchainContext() {
    return useContext(BlockchainContext);
}

function reducer(state, { type, payload }) {
    return {
        ...state,
        [type]: payload,
    };
}


const INIT_STATE = {
    lang: "usa",
    L: locales["usa"],
    signer: "",
    amount: 0,
    cxsAmount: 0,
    provider: null,
    web3Provider: "",
    address: '',
    chainId: '',
    balance: 0,
    tokenAddress: "0xe9e7cea3dedca5984780bafc599bd69add087d56",//BUSD
    contract: null,
    myBalance: 0,
    rate: 0
};

export default function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    useEffect(() => {
        if (state.address == "") {
            dispatch({
                type: "cxsAmount",
                payload: 0
            })
        } else {
            setCXSAmount();
        }
    }, [state.address])

    const setCXSAmount = async () => {
        var contract = ERCContract("0xdC4074390714B5008e01439302f0feD4661Ba4C8");
        const myBalance = fromBigNum(await contract.balanceOf(state.address));
        dispatch({
            type: "cxsAmount",
            payload: myBalance
        })
    }

    useEffect(() => {
        setRate();
    }, [])

    const setRate = async () => {
        dispatch({
            type: "rate",
            payload: await presaleContract._rate()
        })
    }
    useEffect(() => {
        dispatch({
            type: "contract",
            payload: ERCContract(state.tokenAddress)
        })
    }, [state.tokenAddress])

    useEffect(() => {
        if (state.address == "") {
            dispatch({
                type: "amount",
                payload: 0
            })
        } else {
            setAmount();
        }
    }, [state.address, state.tokenAddress])

    const setAmount = async () => {
        var contract = ERCContract(state.tokenAddress);
        const myBalance = fromBigNum(await contract.balanceOf(state.address));
        dispatch({
            type: "amount",
            payload: myBalance
        })
    }

    useEffect(() => {
        if (window.ethereum) {
            dispatch({
                type: "provider",
                payload: new ethers.providers.Web3Provider(window.ethereum)
            })
        }
    }, [window.ethereum])
    useEffect(() => {
        if (window.ethereum) {
            dispatch({
                type: "signer",
                payload: state.provider?.getSigner()
            })
        }
    }, [state.provider])

    const checkBalance = async () => {
        const myBalance = await state.contract.balanceOf(state.address);
        return myBalance;
    }
    //actions
    const buy = async (amount) => {
        try {

            const myBalance = fromBigNum(await checkBalance());
            if (amount > myBalance) {
                NotificationManager.error("Insufficient Balance. Please check your Balance.", "Error");
                return false;
            }
            var erc = state.contract.connect(state.signer);
            var signedPresaleContract = presaleContract.connect(state.signer);

            var approve = await erc.approve(Contrats.presale.address, ethers.utils.parseUnits(amount));
            await approve.wait();
            // var tx = await ERCContract.approve(Addresses[chain], ethers.utils.parseUnits(value.payout));
            // await tx.wait();

            console.log(signedPresaleContract);
            console.log(state.tokenAddress);
            var tx = await signedPresaleContract.buyWithStableCoin(state.tokenAddress, amount);
            await tx.wait();
            NotificationManager.success("Buy Success");
        } catch (err) {
            console.log(err)
            NotificationManager.warning("An error has occured. Please try again", "Warning");
        }
    }

    return (
        <BlockchainContext.Provider
            value={useMemo(
                () => [
                    state,
                    {
                        buy,
                        dispatch
                    }
                ],
                [state]
            )}>
            {children}
        </BlockchainContext.Provider>
    );
}
