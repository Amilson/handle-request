import Router from 'koa-router';

import * as HandleRequestImpl from '../handle-request/web/handle-request-impl';

const routerControl = new Router();
const nestedRoutes = [HandleRequestImpl];
nestedRoutes.forEach(route => {
    routerControl.use(route.default.routes());
});

routerControl.use(routerControl.allowedMethods());

export default routerControl;