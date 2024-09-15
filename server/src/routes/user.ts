import { Router } from "express";
import { FRONTEND_URL } from '../../settings.json';
import passport from "passport";
import database from "../database";

const router: Router = Router();

router.get('/logout', (req, result, next) => {
    if(req.isAuthenticated())
    {
        req.logout((err) => {
            if(err)
                return next(err);

            result.redirect(`${FRONTEND_URL}`);
        });
    }
});
router.get('/profile', (req, res) => {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.redirect('/user/auth/discord');
    }
})

router.get('/auth/discord', passport.authenticate('discord'));

router.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), (req, res) => {
    res.redirect(`${FRONTEND_URL}/dashboard`);
})

router.put('/:user_id', (req, res) => {
    if(!req.isAuthenticated())
    {
        console.log(req.isAuthenticated());
        res.send(req.authInfo);
        res.sendStatus(403);
        console.log('You are not logged.');
    }
    else {
        var body = {...req.body};
        delete body.id;

        database.query('update users set ? where discordId=?', [body, req.params['user_id']], (err, res) => {
            if(err)
            {
                console.error(err);
                return;
            }
        })

    }
}); 
export default router;