function create_function_js(name, arg){
    return ({
        intent: "insert",
        entity: `function ${name}(${arg}){

}`
    });
}
function create_function_py(name, arg){
    return ({
        intent: "insert",
        entity: `def ${name}(${arg}):`
    });
}

module.exports ={
    create_function_js: create_function_js
};
