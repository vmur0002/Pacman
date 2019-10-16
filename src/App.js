import React, { Component } from "react";
import Header from "./components/UI/Header/Header";
import Grid from "./containers/Grid/Grid";
//import Footer from "./components/UI/Footer/Footer";
import Layout from "./hoc/Layout/Layout";

class App extends Component {
  render() {
    return (
      <Layout>
        <Header />
        <Grid />
      </Layout>
    );
  }
}

export default App;
