var Calculation = require('./models/calculation');

function getCalculation(res) {
    Calculation.find(function (err, calculations) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(calculations); // return all calculations in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all calculations
    app.get('/api/calculations', function (req, res) {
        // use mongoose to get all calculations in the database
        getCalculation(res);
    });

    // create calculations and send back all calculations after creation
    app.post('/api/calculations', function (req, res) {

        // create a calculations
        Calculation.create({
            done: false
        }, function (err, calculation) {
            if (err)
                res.send(err);

            // get and return all the calculations after you create another
            getCalculation(res);
        });

    });

    // create todo and send back all todos after creation
    app.post('/api/saveData', function (req, res) {
        var result = req.body.firstNumber * req.body.secondNumber;
        Calculation.create({
            firstNumber: req.body.firstNumber,
            secondNumber: req.body.secondNumber,
            result: result,
            done: false
        }, function (err, calculation) {
            if (err)
                res.send(err);

            // get and return all the calculations after you create another
            getCalculation(res);
        });

    });

    // api ---------------------------------------------------------------------
    // get all calculations
    app.get('/api/getData', function (req, res) {
        // use mongoose to get all calculations in the database
        getCalculation(res);
    });


    // delete a calculations
    app.delete('/api/calculations/:cal_id', function (req, res) {
        Calculation.remove({
            _id: req.params.cal_id
        }, function (err, calculation) {
            if (err)
                res.send(err);

            getCalculation(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
