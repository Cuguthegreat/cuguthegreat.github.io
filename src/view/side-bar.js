import * as htmlCreator from '../services/html-creator.js';

export const renderSideBar = () => {
    htmlCreator.createHtmlElement({
        tagName: 'iframe',
        id: 'baby',
        attributes: {src: 'ressources/baby.svg'},
    });
    htmlCreator.createHtmlElement({id: 'baby-overlay'});
    htmlCreator.createHtmlElement({
        tagName: 'iframe',
        id: 'tombstone',
        attributes: {src: 'ressources/tombstone.svg'},
    });
    htmlCreator.createHtmlElement({id: 'tombstone-drop-zone'});
};
