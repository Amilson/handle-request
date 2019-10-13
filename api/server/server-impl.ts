import { Server } from "./server";
import Koa from 'koa';
import { EnviromentImpl } from './enviroment-impl';
import routerControl from "../router/router-control";

export class ServerImpl implements Server {
    private app: Koa;
    constructor(){
        this.app = new Koa();
    }

    public async bootstrap(){
        await this.startServer();
    }

    private startServer(){
        const { app } = this;

        app.use(routerControl.routes());

        app.listen(EnviromentImpl.api.port, () => {
            console.log('Server is ready');
        });
    }
}