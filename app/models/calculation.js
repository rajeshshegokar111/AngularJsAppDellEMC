var mongoose = require('mongoose');

module.exports = mongoose.model('Calculation', {
    firstNumber: {
    	type: Number,
    	required: true
    },
    secondNumber: {
    	type: Number,
    	required: true
    },
    result: {
    	type: Number,
    	required: true
    }
});