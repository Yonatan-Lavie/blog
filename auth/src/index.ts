import express from "express";
import {json} from 'body-parser';

const app = express();
app.use(json());

app.get('/api/users/currentuser', (req, res)=>{
    res.send('Hi thare!');
});

app.listen(3001, ()=>{
    console.log('[auth] Listening on port 3001!');
})
