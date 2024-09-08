import express from 'express';
import cors from 'cors';
import database, { Connect } from './database';

import fs from 'fs';
import https from 'https';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import DiscordStrategy from 'passport-discord';
import { FRONTEND_URL, API_URL } from '../settings.json';


const privateKey = fs.readFileSync(path.join(__dirname, 'key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'cert.pem'), 'utf8');
const credentials = { key: privateKey, cert: certificate };
const CLIENT_ID = '937011056260313099';
const CLIENT_SECRET = '30qbfLoDNQIXYXC52PIu2SlkeJyTyyuG';
const CALLBACK_URL = `${API_URL}/auth/discord/callback`;

export const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Configure CORS
app.use(cors({
    origin: FRONTEND_URL, // Replace with your React app URL
    credentials: true
}));

passport.use(new DiscordStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: ['identify', 'email']
},  (accessToken, refreshToken, profile, done) => {
    // Here you can save the profile information into the database
    return done(null, profile);
  }));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Session middleware
app.use(session({
    secret: 'asdLKAA@JIOdaji',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true, // Schimbă la true dacă folosești HTTPS
        httpOnly: false,
        sameSite: 'none' // 'none' este necesar pentru a permite trimiterea cookie-urilor între domenii diferite
    }
  }));

app.use(passport.initialize());
app.use(passport.session());

Connect();

import './gets/guilds';
import './gets/users';

// Create an HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(4000, () => {
  console.log(`HTTPS Server running on ${API_URL}`);
});