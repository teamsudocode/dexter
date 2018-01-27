// function run_handler(result, languages="both") {
//     if (languages === "both" || languages ==="js"){
//         return js_handler(result);
//     }
//     else if (languages === "both" || languages ==="py"){
//         return python_handler(result);
//     }
// }

function js_handler(result){
    const js_handler_literal = {
        "declare_string": declare_string_js,
        "declare_integer": declare_integer_js,
        "create_function": create_function_js,
        "create_loop": create_loop_js,
        "move_cursor_to_line": move_cursor_to_line,
        "if_condition": if_condition_js
    };

    let entity = result.intent;
    let function_handler = js_handler_literal[entity];
    let entities = {};
    for (let i of result.entities){
        entities[i.id] = i;
    }
    return function_handler(entities);
}

function py_handler(result){
    const py_handler_literal = {
        "declare_string": declare_string_py,
        "declare_integer": declare_integer_py,
        "create_function": create_function_py,
        "create_loop": create_loop_py,
        "move_cursor_to_line": move_cursor_to_line,
        "if_condition": if_condition_py
    };

    let entity = result.intent;
    let function_handler = py_handler_literal[entity];
    let entities = {};
    for (let i of result.entities){
        entities[i.id] = i;
    }
    return function_handler(entities);
}

function move_cursor_to_line(entities){
    const lineno = entities['move_cursor_to_line_number'].value;
    return ({
        intent: "move",
        entity: `M-g g ${lineno}`
    });
}
function create_function_js(entities){
    const name = entities['create_function_name'].value;
    const arg = entities['create_function_argument'].value;
    return ({
        intent: "insert",
        entity: `function ${name}(${arg}){\n\n}`,
        movement_callback: ["_lineUp"]
    });
}

function create_function_py(entities){
    const name = entities['create_function_name'].value;
    const arg = entities['create_function_argument'].value;
    return ({
        intent: "insert",
        entity: `def ${name}(${arg}):\n`,
        movement_callback: []

    });
}
function create_loop_py(entities){
    const upper_bound = entities['create_loop_counts'].value;
    return ({
        intent: "insert",
        entity: `for i in range(${upper_bound}):\n\t`,
        movement_callback: []
    });
}

function create_loop_js(entities){
    const upper_bound = entities['create_loop_counts'].value;
    return ({
        intent: "insert",
        entity: `for (i = 0; i < ${upper_bound}; i++){\n\n}`,
        movement_callback: [_lineUp]
    });
}

function declare_integer_js(entities){
    const name = entities["declare_integer_var_name"].value;
    const value = entities["declare_integer_var_value"].value;
    return ({
        intent: "insert",
        entity: `var ${name} = ${value};\n`,
        movement_callback: []
    });
}

function declare_integer_py(entities){
    const name = entities["declare_integer_var_name"].value
    const value = entities["declare_integer_var_value"].value
    return ({
        intent: "insert",
        entity: `${name} = ${value}\n`,
        movement_callback: []
    });
}
function declare_string_js(entities){
    const name = entities["declare_string_var_name"].value
    const value = entities["declare_string_var_value"].value
    return ({
        intent: "insert",
        entity: `var ${name} = ${value};\n`,
        movement_callback: []
    });
}

function declare_string_py(entities){
    const name = entities["declare_string_var_name"].value
    const value = entities["declare_string_var_value"].value
    return ({
        intent: "insert",
        entity: `${name} = ${value}\n`,
        movement_callback: []
    });
}

function print_js(entities){
    const name = entities[""];
}
function dexter_js(entities){
    
}

function if_condition_js(){

}

function if_condition_py(){
    
}

function add_js(entities){
    
}
function subtract_js(){
    
}
function multiply_js(){
    
}
function divide_js(){
    
}
function add_py(){
    
}
function subtract_py(){
    
}
function multiply_py(){
    
}
function divide_py(){

}
