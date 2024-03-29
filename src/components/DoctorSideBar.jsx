import React from "react";
import logo from "../assets/img/logo/Symbol.png";
import { Navbar } from "react-bootstrap";
import { BsQuestionCircleFill } from "react-icons/bs";
import { FaFileMedical, FaSignOutAlt, FaStethoscope } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider'
import { useEffect, useState } from "react";

export default function SideBar(props) {


  const [wEb3, setwEb3] = useState({
    provider: null,
    web3: null,
  })

  const providerChanged = (provider) => { provider.on("chainChange", _ => window.location.reload()); }


  //get WEB3
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        providerChanged(provider);
        setwEb3({
          provider,
          web3: new Web3(provider)
        })
      }
    }
    loadProvider();
  }, []);

  const [account, setAccount] = useState();

  // get account
  useEffect(() => {

    const getAccount = async () => {

      const accounts = await wEb3.web3.eth.getAccounts();
      setAccount(accounts);


    }
    getAccount();

  });

  /////////////////
  return (
    <>
      <aside id="sidebar" className="sidebar" style={{borderRadius:"0px 33px 33px 0px"}}>
        <div className="border-bottom rounded-bottom shadow-5 mb-5">
          <Navbar.Brand className="logo mb-4 ">
            <Link to="/home">
              <img
                src={logo}
                alt="Logo"
                style={{ height: "50px", marginRight: "5px" }}
              />
            </Link>
            <span className="text-dark">MediVault</span>
          </Navbar.Brand>
        </div>
        <ul className="sidebar-nav mt-4 " id="sidebar-nav">
          <li className="nav-item">
            <NavLink className="nav-link " to={`/doctorProfile?account=${account}`} style={{borderRadius:"14px"}}>
              <i className="bi bi-grid">
                <FaStethoscope />
              </i>
              <span>{props.tap1}</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to={`/doctorRequest?account=${account}`}style={{borderRadius:"14px"}}>
              <i className="bi bi-grid">
                <FaFileMedical />
              </i>
              <span>{props.tap2}</span>
            </NavLink>
          </li>
          <li className="nav-item mt-4">
            <NavLink className="nav-link" to="/"style={{borderRadius:"14px"}}>
              <i className="bi bi-grid">
                <FaSignOutAlt />
              </i>
              <span>{props.tap3}</span>
            </NavLink>
          </li>
        </ul>
      </aside>
    </>
  );
}
