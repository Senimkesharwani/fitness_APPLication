import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ThemeContextProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

const body = document.querySelector("body");

const script = document.createElement("script");


script.innerHTML = !function(w, d, s, ...args){
  var div = d.createElement('div');
  div.id = 'aichatbot';
  d.body.appendChild(div);
  w.chatbotConfig = args;
  var f = d.getElementsByTagName(s)[0],
  j = d.createElement(s);
  j.defer = true;
  j.type = 'module';
  j.src = 'https://aichatbot.sendbird.com/index.js';
  f.parentNode.insertBefore(j, f);
}
(window, document, 'script', 'DA4B6DBE-C93D-4968-899D-05096749B52B', 'onboarding_bot', {
  apiHost: 'https://api-cf-ap-8.sendbird.com',
});




body.appendChild(script);

root.render(
  <BrowserRouter>
    <ThemeContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeContextProvider>
  </BrowserRouter>
);