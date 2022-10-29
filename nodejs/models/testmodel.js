const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const collectionName = 'test'

const testModelSchema = new mongoose.Schema({
    
    date: { type: Date, default: new Date().toISOString().substring(0, 10),
    name: String },
},
{
    collection: collectionName,
    versionKey: false
});

testModelSchema.plugin(AutoIncrement, { inc_field: 'test_id'})

testModelSchema.statics.findAll = function() {

    return this.find({})
}

module.exports = mongoose.model(collectionName, testModelSchema)