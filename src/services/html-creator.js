export const createHtmlElement = ({
    tagName = 'div',
    parent = document.body,
    id,
    className,
    attributes = {},
    styles = {},
}) => {
    const newNode = document.createElement(tagName);
    parent.appendChild(newNode);
    newNode.id = id;
    newNode.className = className || id;

    for (const style in styles) {
        newNode.style[style] = styles[style];
    }

    for (const attribute in attributes) {
        newNode.setAttribute(attribute, attributes[attribute]);
    }

    return newNode;
};
