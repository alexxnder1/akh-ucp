import express, { Router } from "express";
import database from "../database";
// import { app } from "../main";

const router: Router = express.Router();

router.get('/:guild_id/user/:user_id', (req, result) => {
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
});

router.get('/:guild_id/top', (req, result) => {
    if(req.isAuthenticated())
    {
        database.query('select * from users where guildId=? order by coins DESC', [req.params['guild_id']], (err, res) =>{
            if(err)
            {
                console.error(err);
                return;
            }
            result.json(res);
        });
    }
});

router.get('/:guild_id/logs', (req, result) => {
    if(req.isAuthenticated())
    {
        database.query('select * from logs where guildId=?', [req.params['guild_id']], (err, res) => {
            console.log(res)
            if(err)
            {
                console.error(err);
                return;
            }
            result.json(res);
        });
    }
});
router.get('/:guild_id/charts', (request, result) => {
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
});

router.get('/:owner_id', (req, result) => {
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
});

export default router;