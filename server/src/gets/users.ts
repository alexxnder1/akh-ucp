import { app } from "../main";
import { FRONTEND_URL } from '../../settings.json';
import passport from "passport";
import database from "../database";

app.get('/logout', (req, result, next) => {
    if(req.isAuthenticated())
    {
        req.logout((err) => {
            if(err)
                return next(err);

            result.redirect(`${FRONTEND_URL}`);
        });
    }
    else result.sendStatus(403);
});


app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), (req, res) => {
    res.redirect(`${FRONTEND_URL}/dashboard`);
})

app.get('/api/user', (req, res) => {
  if(req.isAuthenticated())
    res.json(req.user);
    
  else {
      res.redirect('/auth/discord');    
      res.sendStatus(403);
    }    
});

app.get('/profile', (req, res) => {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.redirect('/auth/discord');
        res.sendStatus(403);
    }
})

app.get('/users/:guild_id', (req, result) => {
    if(req.isAuthenticated()) {
        database.query('select * from users where guildId=?', [req.params['guild_id']], (err, res) => {
            if(err)
            {
                console.error(err);
                return;
            }
            
            result.json(res);
            console.log(`[GET] Loaded users for guild ${req.params['guild_id']}`);
        }); 
    }
    else result.sendStatus(403);
});