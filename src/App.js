import './App.css';
import { useEffect, useState } from 'react';
import Login from './Login.js'
import Dashboard from "./Dashboard.js"
import 'bootstrap/dist/css/bootstrap.min.css'
import { getToken } from './Login.js'
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from "./DataLayer"

const spotifyApi = new SpotifyWebApi();

function App() {
  const [accessToken, setAccessToken] = useState(null)
  const [{ user, token }, dispatch] = useDataLayerValue();
  // if (code) {
  //   return <Dashboard code = {code}/> 
  // } else {
  //   return <Login />
  // }
  useEffect(() => {
    const hash = getToken()
    window.location.hash = ""
    const _accessToken = hash.access_token

    console.log("Token is:", _accessToken)

    if (_accessToken) {
      setAccessToken(_accessToken)

      dispatch({
        type: "SET_TOKEN",
        token: _accessToken,
      })

      //passing accessToken to spotify web api
      spotifyApi.setAccessToken(_accessToken);
      spotifyApi.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });      
      });      

      spotifyApi.getUserPlaylists().then((playlists) => {dispatch({
        type:"SET_PLAYLISTS",
        playlists:playlists,
        token: token
      });
    });
  }
  }, [token, dispatch]);

  console.log("User info:", user)
  console.log("Token:", token)

  return (
    <div className = 'app'>
     { accessToken ? 
    <Dashboard className = 'dashboard' token = {token} />: 
      <Login /> }
    </div>
  );
}

export default App;
