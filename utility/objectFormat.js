const capitalize = (input) =>
    `${input.charAt(0).toUpperCase()}${input.slice(1)}`;

const capitalizeKey = (input) =>
    input.split(/(?=[A-Z])/).map(word => capitalize(word)).join(' ');

const newLineToken = '\n';

const lineBreak = newLineToken.repeat(2);

const formatTitle = title => `<b><i>${title}</i></b>`;

const formatArray = childArray =>
    childArray.map((child, index) => `${index + 1}. ${child}`).join(newLineToken);

const formatEntry = ([key, value]) => {

    const formattedTitle = formatTitle(capitalizeKey(key));
    const formattedBody = Array.isArray(value) ? formatArray(value) : value;

    return `${formattedTitle}${newLineToken}${formattedBody}`;
};

export const toHtmlFormat = (title, body) => {

    const formattedTitle = formatTitle(title);
    const formattedBody = Object.entries(body).map(formatEntry).join(lineBreak);

    return `${formattedTitle}${lineBreak}${formattedBody}`;
};