import database from "../database";
import { app } from "../main";

app.put('/user/:user_id', (req, res) => {
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
