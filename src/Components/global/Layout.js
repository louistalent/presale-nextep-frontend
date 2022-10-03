import { useState, useEffect } from "react";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';

import { useBlockchainContext } from '../../context';
import Switcher from "./Switcher";
import { Presale } from "../sections/Presale";
import { Header } from "./Header";

import logo from "../../Assets/images/logo.png";
import iconMigration from "../../Assets/images/Vector (3).svg";
import iconArow from "../../Assets/images/arrow (8) 1.svg";
import toggle from "../../Assets/images/toggle.svg";
import france from "../../Assets/france.png";
import usa from "../../Assets/usa.png";
import './Layout.css';
import { sitelink } from "../../const";
const locales = {
  "usa": require('../../locales/en-US.json'),
  "france": require('../../locales/fr-FR.json'),
};


const Layout = () => {
  const navigate = useNavigate(); // <-- invoke hook
  const [open, setOpen] = useState(true);
  const [presale, setPresaleActive] = useState(true);
  const [migration, setMigrationActive] = useState(false);
  const [isEng, setIsEng] = useState(true);
  const [isWrok, setIsWork] = useState(false)
  let location = useLocation();


  const [state, { dispatch }] = useBlockchainContext();

  const { L } = state;
  const [screenSize, getDimension] = useState(window.innerWidth);
  const setDimension = () => {
    getDimension(window.innerWidth)
  }

  const timeConfirm = async () => {
    try {
      let res = await axios.post(`${sitelink}/timeConfirm`)
      console.log('res: ')
      console.log(res.data);
      if (res.data == 'expried' || res.data == 'page-not-found') {
        console.log('expried')
        navigate("/page-not-found");

      } else {
        console.log('available now')
        // NotificationManager.error("Please confirm your access", "Warning");
      }
    } catch (error) {
      console.warn('timeConfirm : ->');
      navigate("/page-not-found");
      console.log(error);
      NotificationManager.error("Please confirm your access", "Warning");
    }
  }


  const [time, setTime] = useState(+new Date())
  useEffect(() => {
    timeConfirm();
    const timer = setTimeout(() => setTime(+new Date()), 10000)
    return () => clearTimeout(timer)
  }, [time])

  useEffect(() => {
    window.addEventListener('resize', setDimension);
    if (window.innerWidth < 768) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [screenSize])

  useEffect(() => {
    if (isEng) {
      dispatch({
        type: "L",
        payload: locales["usa"]
      })
    } else {
      dispatch({
        type: "L",
        payload: locales["france"]
      })
    }
  }, [isEng])

  useEffect(() => {
    console.log(location.pathname)
    console.log(window.location.hostname);
    if (window.location.hostname == '92.205.128.43' || window.location.hostname == 'http://92.205.128.43' || window.location.hostname == 'https://92.205.128.43') {
      window.location.assign('https://presale.nextepcrypto.com/start-presale')
    }
  }, [location])
  useEffect(() => {
    window.localStorage.setItem('lang', 'usa')
  }, [])

  const activePresale = () => {
    setPresaleActive(true);
    setMigrationActive(false);
  };

  const activeMigration = () => {
    setPresaleActive(false);
    setMigrationActive(true);
  };

  return (
    <>
      <div className="layout flex  ">
        <div
          className={` ${open ? "width-64 padding-5" : "w-0 padding-tm-5"
            } bg-white layout_ h-screen  relative duration-300 md:fixed z-10`}
        >
          <img
            src={toggle}
            className={`toggle brightness-0 dark:filter-none hidden md:block sm:top-[53px] ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
            alt="error"
          />
          <div className="flex items-center justify-center">
            <img
              src={logo}
              className={`sm:ml-7 mt-2 h-7 cursor-pointer duration-500 ${open && "rotate-360"
                }`}
              alt="error"
            />
            {/* <h1
                  className={`font-inter text-xl text-bold font-bold ml-2 next-font my-h1 ${!open && "scale-0"
                    }`}
                >
                  Nextep
                </h1> */}
          </div>
          <ul className="padding-top-11">
            <li
              onClick={() => activePresale()}
              className={`mt-10 flex  rounded-md py-3 px-2 mb-5 cursor-pointer items-center 
                    ${presale ? "primary-bg white" : ""} ${open ? "pl-3" : "px-0"
                }`}
            >
              <img src={iconMigration} alt="error" />
              <span
                className={`${!open && "hidden"
                  } origin-left duration-200 text-base ml-4 dark:white ${presale ? "white" : "site-grey-color"
                  }`}
              >
                {/* Presale */}
                {L['presale']}
              </span>
            </li>


            {/* <li
                  onClick={() => activeMigration()}
                  className={`flex  rounded-md py-3 mb-5 cursor-pointer items-center 
                    ${migration ? "primary-bg white" : ""} ${open ? "pl-3" : "pl-0"
                    }`}
                >
                  <img src={iconArow} alt="error" />
                  <span
                    className={`${!open && "hidden"
                      } origin-left duration-200 text-base ml-4 dark:white ${migration ? "white" : "site-grey-color"
                      }`}
                  >
                    Migration
                  </span>
                </li> */}
          </ul>
          <div className={`${open ? "language-p-3" : ""} flex items-center justify-between switcher-body rounded-3xl mx-3`}>
            <div className={isEng ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'} onClick={() => setIsEng(true)}>
              <img src={usa} width={34} className="pointer" alt="error" />
            </div>

            <div className="width-1 h-5 swithcer-ele mx-5"></div>

            <div className={!isEng ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'} onClick={() => setIsEng(false)}>
              <img src={france} width={34} className="pointer" alt="error" />
            </div>
          </div>
          {/* <ul className="padding-top-11 multilanguage">
                <li
                  onClick={() => setIsEng(!isEng)}
                  className={`mt-10 flex rounded-md mb-5 cursor-pointer items-center multilanguage-contianer`}
                >
                  {isEng ?
                    <img src={usa} style={{ width: '34px', height: '39px' }} alt="error" />
                    :
                    < img src={france} style={{ width: '30px', height: '30px' }} alt="error" />
                  }
                </li>
              </ul> */}
          <Switcher open={open} />
        </div>
        <div className="flex-1 p-7 relative">
          <Header />
          <Presale migration={migration} />
        </div>
      </div>
    </>
  );
};
export default Layout;
