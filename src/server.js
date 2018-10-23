import http from 'http'
import app from './app'
import config from '../config'

const server = http.createServer(app);

const port = config.PORT || 6000;

server.listen(port, () => {
    console.log(`Express server is up and running on port ${port}`)
})