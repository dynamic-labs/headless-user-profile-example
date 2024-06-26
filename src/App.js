import { useState } from "react";
import Main from "./components/Main";
import AlertWrapper from "./components/Alert";

import { ChakraProvider } from "@chakra-ui/react";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

import { ZeroDevSmartWalletConnectors } from "@dynamic-labs/ethereum-aa";

import "./App.css";

function App() {
  const [views, setViews] = useState([]);

  const [alertProps, setAlertProps] = useState({
    show: false,
    type: "",
    message: "",
  });

  return (
    <div className="App">
      <ChakraProvider>
        <DynamicContextProvider
          settings={{
            overrides: {
              views,
            },
            environmentId: process.env.REACT_APP_DYNAMIC_ENVIRONMENT_ID,
            walletConnectors: [
              EthereumWalletConnectors,
              ZeroDevSmartWalletConnectors,
            ],
            eventsCallbacks: {
              onLinkSuccess: (args) => {
                setAlertProps({
                  show: true,
                  type: "success",
                  message: "Wallet linked!",
                });
              },
              onAuthSuccess: (args) => {
                setAlertProps({
                  show: true,
                  type: "success",
                  message: "Auth success!",
                });
              },
              onLogout: (args) => {
                setAlertProps({
                  show: true,
                  type: "success",
                  message: "Logout success!",
                });
              },
              onUserProfileUpdate: (user) => {
                setAlertProps({
                  show: true,
                  type: "success",
                  message: "Profile update success!",
                });
              },
            },
          }}
        >
          {alertProps.show && (
            <AlertWrapper
              setAlertProps={setAlertProps}
              show={alertProps.show}
              type={alertProps.type}
              message={alertProps.message}
            />
          )}
          <Main setViews={setViews} />
        </DynamicContextProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
