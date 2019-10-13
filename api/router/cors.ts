import { BaseContext, Middleware } from 'koa';

export const configureCors = async(ctx: BaseContext, next: () => Promise<any>) => {
    try {
        const methods = ["GET","HEAD","POST","OPTIONS"];
        const allowedHeaders = ["Origin", "X-Requested-With", "Content-Type", "Accept"];
        ctx.vary("Origin");
        ctx.set("Access-Control-Allow-Methods", methods);
        ctx.set("Access-Control-Allow-Headers", allowedHeaders);
        ctx.set("Access-Control-Allow-Origin", "*");
        ctx.set("Access-Control-Allow-Credentials", "true");

        return next();
    }catch(err){
        throw err;
    }
};