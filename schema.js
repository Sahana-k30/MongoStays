const Joi = require('joi');

module.exports.listingSchema=Joi.object({
    newlist:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        image:Joi.string().allow("",null),
    }).required(),
})
