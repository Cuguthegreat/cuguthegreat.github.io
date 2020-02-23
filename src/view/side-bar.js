import {createHtmlElement} from '../services/html-helper.js';

export const renderSideBar = () => {
    createHtmlElement({
        tagName: 'iframe',
        id: 'baby',
        attributes: {src: 'ressources/baby.svg'},
    });
    createHtmlElement({id: 'baby-overlay'});
    createHtmlElement({
        tagName: 'iframe',
        id: 'tombstone',
        attributes: {src: 'ressources/tombstone.svg'},
    });
    createHtmlElement({id: 'tombstone-drop-zone'});
};
