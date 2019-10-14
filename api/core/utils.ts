import { isNullOrUndefined } from 'util';

export function persistNullEmptyUndefined(tp: any): boolean {
    return tp !== null && tp !== undefined && tp !== '' && !isNullOrUndefined(tp);
};

export function getHostName(url: string): string {
    if(url.indexOf('/') < 0) return url;
    return url.substr(0, url.indexOf('/')) || url;
};

export function getHostPath(url: string): string {
    if(url.indexOf('/') < 0) return '';
    return url.substr(url.indexOf('/'), url.length);
};

export const regExpNumberTesting = /^\+?(0|[1-9]\d*)$/;
export const regExpUrlTesting = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;