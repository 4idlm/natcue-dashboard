import express from 'express' 
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import 'babel-polyfill'
import appointmentRoutes from './api/router/appointment' 
import medorderRoutes from './api/router/medorders'
import notificationRoutes from './api/router/notification';

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(cors());

app.use('/', appointmentRoutes)
app.use('/pharmareport/', medorderRoutes)
app.use('/',notificationRoutes)
export default app;