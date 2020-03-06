export const isTestEnv = () =>
    location.href.split('?').indexOf('map=test') >= 0;

export const istTrinkspiel = () =>
    location.href.split('?').indexOf('reload=trinkspiel') >= 0;

export const hasRatCounter = () =>
    location.href.split('?').indexOf('countdown=rats') >= 0;