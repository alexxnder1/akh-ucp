import express from 'express';
import cors from 'cors';
import database, { Connect } from './database';

import fs from 'fs';
import https from 'https';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import DiscordStrategy from 'passport-discord';
// import cookieParser from 'cookie-parser';
// Load the certificate and key
const privateKey = fs.readFileSync(path.join(__dirname, 'key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'cert.pem'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Environment variables (client ID, client secret, etc.)
const CLIENT_ID = '937011056260313099';
const CLIENT_SECRET = '30qbfLoDNQIXYXC52PIu2SlkeJyTyyuG';
const CALLBACK_URL = 'https://localhost:3000/auth/discord/callback';

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Configure CORS
app.use(cors({
    origin: 'https://localhost:3001', // Replace with your React app URL
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

app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), (req, res) => {
    res.redirect('https://localhost:3001/');
})

app.get('/api/user', (req, res) => {
  if(req.isAuthenticated())
    res.json(req.user);
    
  else {
      res.redirect('/auth/discord');    
    // res.status(401).json({ message: 'Not authenticated'});
}    
});

app.get('/profile', (req, res) => {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.redirect('/auth/discord');
    }
})

app.get('/guilds/:owner_id', (req, result) => {
    database.query('select * from guilds where ownerId=?', [req.params.owner_id], (err, res) => {
        if(err)
        {
            console.error(err);
            return;
        }

        result.json(res);
    });
});



app.get('/logout', (req, result, next) => {
    req.logout((err) => {
        if(err)
            return next(err);

        result.redirect('https://localhost:3001/');
    });
});

app.get('/users/:guild_id', (req, result) => {
    database.query('select * from users where guildId=?', [req.params['guild_id']], (err, res) => {
        if(err)
        {
            console.error(err);
            return;
        }

        result.json(res);
    }); 
});


app.get('/logs/:guild_id', (req, result) => {
    database.query('select * from logs where guildId=?', [req.params['guild_id']], (err, res) => {
        if(err)
        {
            console.error(err);
            return;
        }

        result.json(res);
    });
});

// Create an HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(3000, () => {
  console.log('HTTPS Server running on https://localhost:3000');
});