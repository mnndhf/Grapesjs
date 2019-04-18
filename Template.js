const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//setup schema
const TemplateSchema = Schema({
    name: {
        type: String,
        required: true
    },
    html: {
        type: String,
        required: true
    },
    css: {
        type: String,
        required: true
    }
});

//table : templates 
module.exports = Template = mongoose.model('templates', TemplateSchema);
