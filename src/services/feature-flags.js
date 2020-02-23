export const isTestEnv = () =>
    location.href.split('?').indexOf('map=test') >= 0;
