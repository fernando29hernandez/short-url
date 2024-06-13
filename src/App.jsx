import "./App.css";
import { React, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from "axios";
import Background from "./Background";
import Form from "./Form";


function  App   () {

  return (
    <>
    <Background/>
    <Form/>
    </>
  );
}

export default App;