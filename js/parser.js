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
        declare_integer_var_name.addMatch('alpha', 'alpha');
        declare_integer_var_name.addMatch('beta', 'beta');
        declare_integer_var_name.addMatch('gamma', 'gamma');
        declare_integer_var_name.addMatch('my_variable', 'my variable');
        nlp.addEntity(declare_integer_var_name);


        let declare_integer_var_value = new Bravey.NumberEntityRecognizer('declare_integer_var_value');
        nlp.addEntity(declare_integer_var_value);

        // train with some examples
        nlp.addDocument(
            'Declare an integer {declare_integer_var_name} with value {declare_integer_var_value}',
            'declare_integer'
        );

        // test it
        showResults(nlp.test('declare an integer alpha with value 100'));
        // nlp.test('Declare an integer with value 100')
    }
    {
        nlp.addIntent('create_function',[
            { entity: 'create_function_name', id: 'create_function_name'},
            { entity: 'create_function_argument', id: 'create_function_argument'},
        ]);
        let create_function_name = new Bravey.StringEntityRecognizer('create_function_name');
        create_function_name.addMatch('fibonacci', 'fibonacci');
        nlp.addEntity(create_function_name);
        let create_function_argument = new Bravey.StringEntityRecognizer('create_function_argument');
        create_function_argument.addMatch('alpha', 'alpha');

        nlp.addEntity(create_function_argument);

        nlp.addDocument(
            'Create a function {create_function_name} with argument {create_function_argument}',
            'create_function'
        );
        showResults(nlp.test('create function fibonacci with argument alpha.'));
    }

    return nlp;
}

function showResults(result) {
    for (let entity of result.entities) {
        console.log(entity.id, entity.value);
    }
}
