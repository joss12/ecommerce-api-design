import express from 'express'
import cors from 'cors';
import morgan from 'morgan'
import router from './routes/router';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res, next) => {
   res.json({message: 'Tested'})
})

app.use('/api',protect, router);  

app.post('/user', createNewUser);
app.post('/signin', signin);

app.use((err, req, res, next)=>{
    if(err.type === 'auth'){
        res.status(401).json({message: 'unauthorized'})
    }else if(err.type === 'input'){
        res.status(400).json({message: 'invalid input'})
    }else{
        res.status(500).json({message: 'Oops, something went wrong'})
    }
})


export default app ;
