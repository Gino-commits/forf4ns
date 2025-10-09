import express, { json } from 'express'
import cookieParser from 'cookie-parser';
import { logsRouter } from './routes/logs.js';
import { sessionVerifier } from './middlewares/session-verifier.js';

const app = express();

app.use(json())
app.use(cookieParser())
app.use(sessionVerifier)
app.disable('x-powered-by')
app.use('/', logsRouter)
app.set('view engine', 'ejs')

const PORT = process.env.port ?? 1234
app.listen(PORT, ()=>{
    console.log(`Server listening on http://localhost:${PORT}`)
})