import Router from "koa-router";
import { BaseContext } from "koa";
import { HandleRequest } from "./handle-request";

class HandleRequestImpl implements HandleRequest{
    private router: Router = new Router();
    
    constructor(){}
    
    public buildRoutes(): Router{
        const { router } = this;

        router.get('/delay/:delay', this.delay.bind(this));
        router.get('/delay/:delay/url/:init//:final*', this.delayWithParams.bind(this));
        router.get('/error/:error', this.error.bind(this));
        router.get('/error/:error/delay/:delay', this.error.bind(this));
        return this.router;
    }

    async delay(ctx: BaseContext){
        let { delay } = ctx.params;
        await this.sleep(delay);
        ctx.status = 200;
    }

    async delayWithParams(ctx: BaseContext){
        let { delay, init, final } = ctx.params;
        await this.sleep(delay);
        ctx.redirect(init+final);
        ctx.status = 302;
    }

    async error(ctx: BaseContext){
        let { delay, error } = ctx.params;
        await this.sleep(delay);
        ctx.status = parseInt(error);
    }
    
    private sleep(ms = 0) {
        return new Promise(r => setTimeout(r, ms));
    }
}

export default new HandleRequestImpl().buildRoutes() as Router;