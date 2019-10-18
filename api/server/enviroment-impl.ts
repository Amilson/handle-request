import { Enviroment } from './enviroment';

export const EnviromentImpl: Enviroment = {
    api: {
        port: parseInt(process.env.api_port || '9999')
    }
}