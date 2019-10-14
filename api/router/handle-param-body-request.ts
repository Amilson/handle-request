import { BaseContext } from 'koa';
import { regExpUrlTesting, persistNullEmptyUndefined, regExpNumberTesting } from '../core/utils';

export const handleParamBodyRequest = async(ctx: BaseContext, next: () => Promise<any>) => {
    try {
        let { delay, protocol, url, error } = ctx.params;
        protocol = protocol.replace(/[^A-Za-z]/g,'');
        let errorMessage: string[] = [];
        if(persistNullEmptyUndefined(delay) && !regExpNumberTesting.test(delay))
            errorMessage.push(`Param [delay] must contain only numbers. Expected [0-9], received [${delay}].`);

        if(persistNullEmptyUndefined(error) && !regExpNumberTesting.test(error))
            errorMessage.push(`Param [error] must contain only numbers. Expected [0-9], received [${delay}].`);
        
        if(persistNullEmptyUndefined(protocol) && !(protocol === 'http' || protocol === 'https'))
            errorMessage.push(`Param [url] must contain protocol http or https`);

        if(persistNullEmptyUndefined(url) && !regExpUrlTesting.test(url))
            errorMessage.push(`Param [url] is invalid`);
        
        if(errorMessage.length > 0){
            let err = {
                message: 'Please, check this errors',
                errors: errorMessage
            }
            ctx.body = err;
            ctx.status = 404;
            return;
        }

        ctx.params = {
            delay: delay,
            protocol: protocol,
            url: url,
            error: error
        }

        return next();
    }catch(err){
        throw err;
    }
};