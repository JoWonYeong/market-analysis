const mongoose = require('mongoose');
const collectionName = 'summary'

const summaryModelSchema = new mongoose.Schema({
    
    dong: { type: String, required: true, unigue: true },
    sex_rate: { type: Number },
    age_avg: { type: Number },
    float_pop_year: { type: Number },
    meat_period_avg: { type: Number },
    japanese_period_avg: { type: Number },
    chinese_period_avg: { type: Number },
    korean_period_avg: { type: Number },
    cafe_period_avg: { type: Number },
    above_period_avg: { type: String, trim: true }
},
{
    collection: collectionName,
    versionKey: false
});


summaryModelSchema.statics.findAll = function() {

    return this.find({})
}

module.exports = mongoose.model(collectionName, summaryModelSchema)