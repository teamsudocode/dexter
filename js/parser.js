var allowed_variable_names = [
    { id: 'alpha', text: 'alpha' },
    { id: 'beta', text: 'beta' },
    { id: 'gamma', text: 'gamma' },
    { id: 'my_variable', text: 'my variable' },
    { id: 'random_number', text: 'random number' },
    { id: 'x', text: 'x' },
    { id: 'y', text: 'y' },
    { id: 'z', text: 'z' },
    { id: 'i', text: 'i' },
]

var allowed_relational_operators = [
    { id: 'equal_to', text: 'equal to' },
    { id: 'equal_to', text: 'equal to' },
    { id: 'equal_to', text: 'equals to' },
    { id: 'equal_to', text: 'equals' },
    { id: 'greater_than', text: 'greater than' },
    { id: 'greater_than', text: 'is greater than' },
    { id: 'less_than', text: 'less than' },
    { id: 'less_than', text: 'is less than' },
]

// var allowed_logical_operators = [ 'and', 'or', 'not' ]
var allowed_logical_operators = [
    { id: 'and', text: 'and' },
    { id: 'or', text: 'or' },
    { id: 'not', text: 'not' },
]

var allowed_arithmetic_operators = [
    { id: 'sum', text: 'sum' },
    { id: 'difference', text: 'difference' },
    { id: 'product', text: 'product' },
    { id: 'division', text: 'division' },
]

var allowed_numbers = [
    { id: 'zero', text: 'zero' },
    { id: 'one', text: 'one' },
    { id: 'two', text: 'two' },
    { id: 'three', text: 'three' },
    { id: 'four', text: 'four' },
    { id: 'five', text: 'five' },
]

var allowed_function_names = [
    { id: 'fibonacci', text: 'fibonacci' },
    { id: 'factorial', text: 'factorial' },
    { id: 'prime_finder', text: 'prime finder' },
]

var known_commands = [
    { id: 'move_up', text: 'move up' },
    { id: 'move_down', text: 'move down' },
    { id: 'move_left', text: 'move left' },
    { id: 'move_right', text: 'move right' },

    { id: 'dexter_start', text: 'dexter start' },
    { id: 'dexter_stop', text: 'dexter stop' },
    { id: 'dexter_javascript', text: 'dexter javascript'},
    { id: 'dexter_python', text: 'dexter python'},
    { id: 'dexter_full', text: 'dexter full'},

    { id: 'dexter_clear', text: 'dexter clear' },

    { id: 'dexter_run', text: 'dexter run code' },
    { id: 'dexter_run', text: 'code chala do bhai' },
    { id: 'dexter_run', text: 'arey bhai bhai bhai' },
    { id: 'dexter_zulip', text: 'zulip pe bhej do' },
    { id: 'dexter_zulip', text: 'dexter save' },
]

function IsKnownCommand(command) {
    for (let each of known_commands) {
        if (each.id == command) return true
    }
    return false
}


function setUpNlp() {
    if (window.Bravey === undefined) {
        throw "Bravey is not available";
    }

    var nlp = new Bravey.Nlp.Fuzzy();
        
    // adding intents one by one

    // declare_integer
    {
        nlp.addIntent('declare_integer', [
            { entity: 'declare_integer_var_name', id: 'declare_integer_var_name' },
            { entity: 'declare_integer_var_value', id: 'declare_integer_var_value' },
        ]);

        let declare_integer_var_name = new Bravey.StringEntityRecognizer('declare_integer_var_name');

        for (let each of allowed_variable_names) {
            declare_integer_var_name.addMatch(each.id, each.text)
        }
        nlp.addEntity(declare_integer_var_name);

        let declare_integer_var_value = new Bravey.NumberEntityRecognizer('declare_integer_var_value');
        nlp.addEntity(declare_integer_var_value);

        // train with some examples
        nlp.addDocument(
            'Declare an integer {declare_integer_var_name} with value {declare_integer_var_value}',
            'declare_integer'
        );

        nlp.addDocument(
            'Create an integer {declare_integer_var_name} with value {declare_integer_var_value}',
            'declare_integer'
        );

        // test it
        showResults(nlp.test('declare an integer alpha with value 100'));
        // nlp.test('Declare an integer with value 100')
    }

    //create_function
    {
        nlp.addIntent('create_function', [
            { entity: 'create_function_name', id: 'create_function_name' },
            { entity: 'create_function_argument', id: 'create_function_argument' },
        ]);
        // let create_function_name = new Bravey.StringEntityRecognizer('create_function_name')
        // create_function_name.addMatch('fibonacci', 'fibonacci')
        // nlp.addEntity(create_function_name)

        let create_function_name = new Bravey.StringEntityRecognizer('create_function_name')
        for (let each of allowed_function_names) {
            create_function_name.addMatch(each.id, each.text)
        }
        nlp.addEntity(create_function_name)

        let create_function_argument = new Bravey.StringEntityRecognizer('create_function_argument')
        for (let each of allowed_variable_names) {
            create_function_argument.addMatch(each.id, each.text)
        }

        nlp.addEntity(create_function_argument);

        nlp.addDocument(
            'Create a function {create_function_name} with argument {create_function_argument}',
            'create_function'
        )

        showResults(nlp.test('create function fibonacci with argument alpha.'));
    }

    // declare_string
    {
        nlp.addIntent('declare_string', [
            { entity: 'declare_string_var_name', id: 'declare_string_var_name' },
            { entity: 'declare_string_var_value', id: 'declare_string_var_value' },
        ]);

        let declare_string_var_name = new Bravey.StringEntityRecognizer('declare_string_var_name');
        for (let each of allowed_variable_names) {
            declare_string_var_name.addMatch(each.id, each.text)
        }
        nlp.addEntity(declare_string_var_name);

        let declare_string_var_value = new Bravey.NumberEntityRecognizer('declare_string_var_value');
        nlp.addEntity(declare_string_var_value);

        // train with some examples
        nlp.addDocument(
            'Declare an string {declare_string_var_name} with value {declare_string_var_value}',
            'declare_string'
        );

        // test it
        showResults(nlp.test('declare an string alpha with value tomato'));
        // nlp.test('Declare an integer with value 100')
    }

    // create loop
    {
        nlp.addIntent('create_loop', [
            { entity: 'create_loop_counts', id: 'create_loop_counts' },
        ]);

        let create_loop_counts = new Bravey.NumberEntityRecognizer('create_loop_counts');
        nlp.addEntity(create_loop_counts);

        // train with some examples
        nlp.addDocument(
            'Create a loop for {create_loop_counts} counts',
            'create_loop'
        );

        // test it
        showResults(nlp.test('run a loop for 100 counts'));
        showResults(nlp.test('make a loop for 20 counts'));
    }

    // move cursor to line
    // {
    //     nlp.addIntent('move_cursor_to_line', [
    //         { entity: 'move_cursor_to_line_number', id: 'move_cursor_to_line_number' },
    //     ]);

    //     let move_cursor_to_line_number = new Bravey.NumberEntityRecognizer('move_cursor_to_line_number');
    //     nlp.addEntity(move_cursor_to_line_number);
    //     // train with some examples;
    //     nlp.addDocument(
    //         'Move cursor to line {move_cursor_to_line_number}',
    //         'move_cursor_to_line'
    //     );

    //     // test it
    //     showResults(nlp.test('move cursor to line 100'));
    //     showResults(nlp.test('place cursor on line 343'));
    // }

    // if_else
    {
        nlp.addIntent('if_condition', [
            { entity: 'if_condition_1_lhs', id: 'if_condition_1_lhs' },
            { entity: 'if_condition_1_op', id: 'if_condition_1_op' },
            { entity: 'if_condition_1_rhs', id: 'if_condition_1_rhs' },
            
            { entity: 'if_condition_join_op', id: 'if_condition_join_op' },
            
            { entity: 'if_condition_2_lhs', id: 'if_condition_2_lhs' },
            { entity: 'if_condition_2_op', id: 'if_condition_2_op' },
            { entity: 'if_condition_2_rhs', id: 'if_condition_2_rhs' },
        ]);

        // for lhs, match with variable names
        for (let target of ['if_condition_1_lhs', 'if_condition_2_lhs']) {
            let variable_name = new Bravey.StringEntityRecognizer(target)
            for (let each of allowed_variable_names) {
                variable_name.addMatch(each.id, each.text)
            }
            nlp.addEntity(variable_name)
        }

        // for rhs, match with numbers
        for (let target of ['if_condition_1_rhs', 'if_condition_2_rhs']) {
            let number = new Bravey.StringEntityRecognizer(target)
            for (let each of allowed_numbers) {
                number.addMatch(each.id, each.text)
            }
            nlp.addEntity(number)
        }

        // for lhs, rhs, the relational operators
        for (let target of ['if_condition_1_op', 'if_condition_2_op']) {
            let operator = new Bravey.StringEntityRecognizer(target)
            for (let each of allowed_relational_operators) {
                operator.addMatch(each.id, each.text)
            }
            nlp.addEntity(operator)
        }

        // for the two clauses
        {
            let operator = new Bravey.StringEntityRecognizer('if_condition_join_op')
            for (let each of allowed_logical_operators) {
                operator.addMatch(each.id, each.text)
            }
            nlp.addEntity(operator)
        }
        
        // lets train it
        nlp.addDocument(
            'if alpha equals one and alpha equals two',
            'if_condition',
            { fromFullSentence: true, expandIntent: true },
        )

        nlp.addDocument(
            'if alpha equals one or beta equals one',
            'if_condition',
            { fromFullSentence: true, expandIntent: true },
        )
        
        nlp.addDocument(
            'if alpha equals one and x equals zero',
            'if_condition',
            { fromFullSentence: true, expandIntent: true },
        )

        // nlp.addDocument(
        //     'if with condition {if_condition_1_lhs} {if_condition_1_op} {if_condition_1_rhs} {if_condition_join_op} {if_condition_2_lhs} {if_condition_2_op} {if_condition_2_rhs}',
        //     'if_condition'
        // )

        // nlp.addDocument(
        //     'if {if_condition_1_lhs} {if_condition_1_op} {if_condition_1_rhs}',
        //     'if_condition'
        // )

        // testing some examples
        // showResults(nlp.test('if alpha is greater than 5'))
        showResults(nlp.test('if alpha equals one or beta equals two'))
    }

    // arithmetic operations
    {
        nlp.addIntent('arithmetic_operation', [
            { entity: 'arithmetic_operand_1', id: 'arithmetic_operand_1' },
            { entity: 'arithmetic_operand_2', id: 'arithmetic_operand_2' },
            { entity: 'arithmetic_operator', id: 'arithmetic_operator' },
            { entity: 'arithmetic_lhs', id: 'arithmetic_lhs' },
        ])

        nlp.addEntity(new Bravey.NumberEntityRecognizer('arithmetic_operand_2'))
        let arithmetc_operator = new Bravey.StringEntityRecognizer('arithmetic_operator')
        for (let each of allowed_arithmetic_operators) {
            arithmetc_operator.addMatch(each.id, each.text)
        }
        nlp.addEntity(arithmetc_operator)

        for (let target of ['arithmetic_operand_1', 'arithmetic_lhs']) {
            let variable_name = new Bravey.StringEntityRecognizer(target)
            for (let each of allowed_variable_names) {
                variable_name.addMatch(each.id, each.text)
            }
            nlp.addEntity(variable_name)
        }
    
        // train with some examples
        // nlp.addDocument(
        //     '{arithmetic_operator} {arithmetic_operand_1} and {arithmetic_operand_2} and store it in {arithmetic_lhs}',
        //     'arithmetic_operation'
        // )
        nlp.addDocument(
            'store sum of x and 3 in alpha',
            'arithmetic_operation',
            { fromFullSentence: true, expandIntent: true }
        )

        nlp.addDocument(
            'store product of alpha and 30 in beta',
            'arithmetic_operation',
            { fromFullSentence: true, expandIntent: true }
        )

        nlp.addDocument(
            'store difference of gamma and 10 in x',
            'arithmetic_operation',
            { fromFullSentence: true, expandIntent: true }
        )

        nlp.addDocument(
            'store the division of y and 8 in y',
            'arithmetic_operation',
            { fromFullSentence: true, expandIntent: true }
        )
        // some tests
        showResults(nlp.test('store the sum of z and 20 in z'))
        
    }

    // some custom commands
  
    for (let command of known_commands) {
        nlp.addDocument(command.text, command.id, { fromFullSentence: true, expandIntent: true })
    }
   

    // print function
    {
        nlp.addIntent('print', [
            { entity: 'argument', id: 'argument' }
        ]);

        let argument = new Bravey.StringEntityRecognizer('argument');
        for (let each of allowed_variable_names) {
            argument.addMatch(each.id, each.text)
        }
        nlp.addEntity(argument);

        // train with some examples
        nlp.addDocument(
            'print {argument}',
            'print'
        );

        // test it
        showResults(nlp.test('print alpha'));
        // nlp.test('Declare an integer with value 100')
    }

    

    return nlp;
}

function showResults(result) {
    if (result) {
        for (let entity of result.entities) {
            console.log(entity.id, entity.value);
        }
    } else {
        console.log('something failed here')
    }
}
