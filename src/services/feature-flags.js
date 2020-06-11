export const getTimeout = () => {
    const queryString = location.href.split('?')[1];
    const queryParams = queryString.split('&');
    const timeoutParam = queryParams.find(queryParam => queryParam.indexOf('timeout=') >=0);
    const timeout = timeoutParam ? timeoutParam.split('=')[1] : 250;

    return timeout >= 250 ? timeout : 250;
};
