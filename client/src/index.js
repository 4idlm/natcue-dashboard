import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import store from "./Store/Store";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "react-day-picker/lib/style.css";
import "spicy-datatable/src/sample-styles.css";
import "antd/dist/antd.css"; 

const client = new ApolloClient({
  uri: "http://admin.natcue.com/healthtips/graphql"
});

const app = (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
