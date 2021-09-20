import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './Login.css'

export const authEndpoint = 'https://accounts.spotify.com/authorize'

const redirect_uri = 'http://localhost:3000'
const client_id = 'clientid'
const client_secret = 'clientsecret'

const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "user-library-modify",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
  ];

export const auth_url = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

//pulling access token from url
export const getToken = () => {
    return window.location.hash.substring(1).split('&')
    .reduce((initial, item) => {
      let parts = item.split('='); 
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
    // const token = new URLSearchParams(window.location.hash).get('access_token')
    // return token
}

//displaying login button
export default function Login() {
    return (
    <div className = 'loginpage'>
        {/* <strong>Welcome</strong> */}
        <a className = 'loginbutton' href={auth_url}>
        LOGIN WITH SPOTIFY
        </a>
    </div>
    )
}

