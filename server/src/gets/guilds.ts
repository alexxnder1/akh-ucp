import database from "../database";
import { app } from "../main";


app.get('/guilds/:guild_id/user/:user_id', (req, result) => {
    if(req.isAuthenticated())
    {
        database.query('select * from users where guildId=? and discordId=?', [req.params['guild_id'], req.params['user_id']], (err, res) => {
            if(err)
            {
                console.error(err);
                return;
            }
    
            result.json(res[0]);
        }); 
    }
    else result.sendStatus(403);
});

app.get('/guilds/:guild_id/top', (req, result) => {
    if(req.isAuthenticated())
    {
        database.query('select * from users where guildId=? and coins > 0 order by coins DESC', [req.params['guild_id']], (err, res) =>{
            if(err)
            {
                console.error(err);
                return;
            }
            result.json(res);
        });
    }
    else result.sendStatus(403);
});

app.get('/logs/:guild_id', (req, result) => {
    if(req.isAuthenticated())
    {
        database.query('select * from logs where guildId=?', [req.params['guild_id']], (err, res) => {
            if(err)
            {
                console.error(err);
                return;
            }
    
            result.json(res);
        });
    }
    else result.sendStatus(403);
});

app.get('/commands', (request, result) => {
    if(request.isAuthenticated())
    {
        database.query('select * from commands', (err, res) => {
            if(err)
            {
                console.error(err);
                result.sendStatus(404);
                return;
            }
            
            result.json(res);
        })
    }
    else result.sendStatus(403);
});

app.get('/:guild_id/charts', (request, result) => {
    if(request.isAuthenticated())
    {
        database.query('select * from user_charts where guildId=?', [request.params['guild_id']], (err, res) => {
            if(err)
            {
                console.error(err);
                result.sendStatus(404);
                return;
            }
            
            result.json(res);
        })
    }
    else result.sendStatus(403);
});

app.get('/guilds/:owner_id', (req, result) => {
    if(req.isAuthenticated()) {
        database.query('select * from guilds where ownerId=?', [req.params.owner_id], (err, res) => {
            if(err)
            {
                console.error(err);
                return;
            }
    
            result.json(res);
        });
    }
    else result.sendStatus(403);
});