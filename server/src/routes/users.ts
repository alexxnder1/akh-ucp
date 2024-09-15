
import { FRONTEND_URL } from '../../settings.json';
import passport from "passport";
import database from "../database";

import { Router } from "express";
const router: Router = Router();

router.get('/:guild_id', (req, result) => {
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
export default router;