const Joi = require("joi");

const RegisterSchema = Joi.object({
  q1: Joi.string().required().messages({
    "any.required": `"Position" is Required"`,
  }),
  q2: Joi.number().min(0).max(60).required().messages({
    "number.base": `"Years" must be a number`,
    "number.min": `"Years" must be at least 0`,
    "any.required": `"Years" are Required"`,
  }),
  q3: Joi.string().min(5).required().messages({
    "string.base": `"Answer 3" must be a string`,
    "string.min": `"Answer 3" must be at least 5 charachters`,
    "any.required": `"Answer 3" is required`,
  }),
  q4: Joi.string().min(5).required().messages({
    "string.base": `"Answer 4" must be a string`,
    "string.min": `"Answer 4" must be at least 5 charachters`,
    "any.required": `"Answer 4" is required`,
  }),
  q5: Joi.string().min(5).required().messages({
    "string.base": `"Answer 5" must be a string`,
    "string.min": `"Answer 5" must be at least 5 charachters`,
    "any.required": `"Answer 5" is required`,
  }),
});

const VRegisteration = async (req, res, next) => {
  try {
    const valResult = await RegisterSchema.validate(req.body);
    if (!valResult.error) {
      next();
    } else {
      throw new Error(`could not procced: ${valResult.error.message}`);
    }
  } catch (err) {
    res.status(400).end(`${err}`);
  }
};

const VQ5Counter = async (req, res, next) => {
  //validate the answer 5 is at most 100 words
  try {
    const q5 = req.body.q5;
    let count = q5.split(" ").length;
    if (count <= 100) {
      next();
    } else {
      throw new Error(`could not procced: Answer 5 must be max 100 words`);
    }
  } catch (err) {
    res.status(400).end(`${err}`);
  }
};

module.exports = { VRegisteration, VQ5Counter };
