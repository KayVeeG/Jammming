import React, { useEffect } from "react";

async function getToken(requestUrl) {
  const response = await fetch(requestUrl) 
}

//obtain access token
var client_id = "";
var redirect_uri = "http://localhost:3000";

var state = generateRandomString(16);

localStorage.setItem(stateKey, state);
var scope = "user-read-private user-read-email";

var url = "https://accounts.spotify.com/authorize";
url += "?response_type=token";
url += "&client_id=" + encodeURIComponent(client_id);
url += "&scope=" + encodeURIComponent(scope);
url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
url += "&state=" + encodeURIComponent(state);

// getToken(url);

const ApiHandler = () => {
  // Effect to handle the response from Spotify
  useEffect(() => {
    console.log(process.env.CLIENT_ID);
  }, []);

}

export default ApiHandler;