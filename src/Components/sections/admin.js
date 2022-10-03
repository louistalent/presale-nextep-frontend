
import React, { useEffect, useState } from "react";
import axios from "axios";
import Crypto from "../../Assets/images/website (4) 1.svg";
import Mail from "../../Assets/images/mail 1.svg";
import { NotificationManager } from "react-notifications";
import './admin.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Copy from "../../Assets/copy.png";
import Copy_white from "../../Assets/copy-white.png";
import { sitelink } from "../../const";

const Admin = () => {
    const [copied, setCopied] = useState(false);
    const [newLink, setNewLink] = useState('');

    useEffect(() => {
        if (copied) {
            NotificationManager.success("Successfully Copied!", "Success");
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
    }, [copied])

    const getNewLink = () => {
        axios.post(`${sitelink}/generateNewLink`).then((res) => {
            console.log('res: ')
            if (res.data) {
                console.log(res);
                // setNewLink('https://presale.nextepcrypto.com/submit?token=' + res.data);
                setNewLink(`${sitelink}/submit?token=` + res.data);
                NotificationManager.success("Successfully generated", "Success");
            } else {
                NotificationManager.success("Check the backend", "Warning");
            }
        })
    }
    const deleteAll = () => {
        let res = window.confirm('Are you sure?')
        if (res) {
            axios.post(`${sitelink}/deleteAll`).then((res) => {
                console.log('res: ')
                if (res.data == 'success') {
                    NotificationManager.success("Deleted", "Success");
                } else {
                    NotificationManager.error("Check the backend", "Error");
                }
            })
        }
    }

    return (
        <div className="sm:mt-9">
            <div className="p-21 sm:w-[100%] sm:top-24 sm:-translate-y-2/4">
                <div className="px-8 py-7 bg-white dark:bg-black rounded-3xl">
                    <div>
                        <h1 className="font-inter text-black dark:text-white text-lg font-semibold mb-3 pb-0">
                            Link Generator
                        </h1>
                        <div className="mt-2">
                            <div className="flex mb-5 sm:flex-col sm:mb-4 sm:w-[100%]">
                                <a onClick={getNewLink} className="md:w-[100%] cursor-pointer">
                                    <div className="flex items-center border border-black dark:border-white padding-9 border-opacity-10 mr-4 sm:mr-[0px] sm:mb-[16px]">

                                        <p className="font-inter text-color-1 dark:text-white text-base ml-3">
                                            New Generator Link
                                        </p>
                                    </div>
                                </a>
                                <a onClick={deleteAll} className="md:w-[100%] cursor-pointer">
                                    <div className="flex items-center border border-black dark:border-white padding-9 border-opacity-10 mr-4 sm:mr-[0px] sm:mb-[16px]">

                                        <p className="font-inter text-color-1 dark:text-white text-base ml-3">
                                            Delete&nbsp; All&nbsp; Link
                                        </p>
                                    </div>
                                </a>
                            </div>

                        </div>
                        {/* <p className="font-inter text-color-1 dark:text-slate-500 text-sm mb-4">
                            Select wallet
                        </p> */}
                        <CopyToClipboard onCopy={() => newLink ? setCopied(true) : setCopied(false)} text={newLink ? newLink : ''}>
                            <div className="flex relative justify-between items-center new-link-width bg-color-1 dark:bg-black-1 pading-3 rounded-lg mb-6 sm:w-[100%] cursor-pointer">
                                <div className="flex items-center w-full">
                                    <div className="flex flex-col ml-5 w-full">
                                        <label className="label-style-1 font-inter text-color-1 dark:text-white text-base">
                                            Address
                                        </label>
                                        <div className="flex flex-row items-center">
                                            <img src={Copy} width="28" className="dark:hidden"></img>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            {
                                                newLink
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CopyToClipboard>
                    </div>
                </div>


            </div>
        </div>
    );
};
export default Admin;
