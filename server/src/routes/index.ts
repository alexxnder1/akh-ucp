import { Router } from 'express';
import guildsRoutes from './guilds';
import usersRoutes from './users';
import userRoutes from './user';
import { app } from '../main';

app.use('/users', usersRoutes);
app.use('/guilds', guildsRoutes);
app.use('/user', userRoutes);
