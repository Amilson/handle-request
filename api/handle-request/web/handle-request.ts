import { BaseContext } from 'koa';

export interface HandleRequest{
    delay(ctx: BaseContext): Promise<void>;
    error(ctx: BaseContext): Promise<void>;
}