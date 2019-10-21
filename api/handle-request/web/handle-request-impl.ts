import Router from 'koa-router';
import Http from 'http';
import Https from 'https';
import { BaseContext } from 'koa';
import { HandleRequest } from './handle-request';
import { persistNullEmptyUndefined, getHostName, getHostPath } from '../../core/utils';
import { handleParamBodyRequest } from '../../router/handle-param-body-request';

class HandleRequestImpl implements HandleRequest{
    private router: Router = new Router();
    
    constructor(){}
    
    public buildRoutes(): Router{
        const { router } = this;

        router.get('/delay/:delay', handleParamBodyRequest, this.delay.bind(this));
        //nginx here will replace :protocol:// to :protocol:/
        router.get('/delay/:delay/url/:protocol/:url*', handleParamBodyRequest, this.delay.bind(this));
        router.get('/error/:error', handleParamBodyRequest, this.error.bind(this));
        router.get('/error/:error/delay/:delay', handleParamBodyRequest, this.error.bind(this));
        return this.router;
    }

    async delay(ctx: BaseContext){
        let { delay, protocol, url } = ctx.params;
        await this.sleep(delay);
        if(persistNullEmptyUndefined(protocol) && 
           persistNullEmptyUndefined(url)){
           await this.redirect(ctx, protocol, url);
        }else{
            ctx.status = 200;
        }
    }

    async error(ctx: BaseContext){
        let { delay, error } = ctx.params;
        await this.sleep(delay);
        ctx.status = parseInt(error);
    }
    
    private sleep(ms = 0) {
        return new Promise(r => setTimeout(r, ms));
    }

    private redirect(ctx: BaseContext, protocol: string, url: string){
        return new Promise((result, reject) => {
            try{
                let hostname = getHostName(url);
                let path = getHostPath(url);
                let requestDinamicaly = protocol === 'http' ? Http : Https;
                let httpOptions = {
                    hostname: hostname,
                    method: 'GET',
                    path: path,
                    rejectUnauthorized: false,
                    headers: {
                        'Content-Type': 'application/json',
                        ...ctx.headers
                    }
                };
                if(persistNullEmptyUndefined(requestDinamicaly)){
                    const req = requestDinamicaly.get(httpOptions, (res) => {
                        res.setEncoding('utf8');
                        res.on('data', (chunk) => {
                            ctx.body = persistNullEmptyUndefined(ctx.body) ? ctx.body : '';
                            ctx.body += chunk;
                        });
                        res.on('end', () => {
                            ctx.status = res.statusCode || 200;
                            result(ctx);
                        });
                    });

                    req.on('error', (e) => {
                        ctx = this.handleError(ctx, e.message);
                        result(ctx)
                    });
                }
            }catch(e){
                ctx = this.handleError(ctx, e.message);
                result(ctx)
            }
        });
    }

    private handleError(ctx: BaseContext, error: string): BaseContext{
        ctx.body = `Ops, seems like we have a problem with request: ${error}`;
        ctx.status = 400;
        return ctx;
    }
}

export default new HandleRequestImpl().buildRoutes() as Router;