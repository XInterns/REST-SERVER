const removeQuotes = (match , p1, p2, p3) => `${p2}`

const convertToJSON = (decodedQueryString) => {
    const parameters = decodedQueryString.split('&');
    let formattedParameters = {};
    parameters.forEach((parameter) => {
        const key =  parameter.split('=')[0];
        const value =  parameter.split('=')[1].replace(/(')(.*?)(')/g,removeQuotes);
         formattedParameters =  Object.assign({}, formattedParameters, {[key]: value})
    });
    return formattedParameters;
}


const processor = (encodedString) => {
    const query = decodeURI(encodedString);
    return query === null ? {} : convertToJSON(query);
}


module.exports = processor;