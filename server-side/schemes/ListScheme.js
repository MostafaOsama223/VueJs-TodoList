const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    x: String,
    items: Array,
    header: String
});

exports.ListSchema = ListSchema;