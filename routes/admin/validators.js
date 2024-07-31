const {check} = require('express-validator')
const usersRepo = require('../../repositories/users')

module.exports = {
    requireTitle: check('title')
    .trim()
    .isLength({min: 5, max : 40})
    .withMessage('Must be between 5 to 40 characters.'),

    requirePrice: check('price')
    .trim()
    .toFloat()
    .isFloat({min: 1})
    .withMessage('Must be decimal'),

    requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email) => {
      const existingUser = await usersRepo.getOneBy({ email });
      if (existingUser) throw new Error("Email in use");
    }),

    requirePassword: check("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Must be between 4 and 20 characters."),
    
    requirePasswordConfirmation: check("passwordConfirmation")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters.")
    .custom((passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error("Passwords must matchhhhhh");
      }
      return true
    }),

    requireEmailExists: check("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Must Provide a vaid email")
      .custom(async (email) => {
        const user = await usersRepo.getOneBy({ email });
        if (!user) {
          throw new Error("Email not found!");
        }
      }),

    requireValidPasswordFor: check("password").trim()
    .custom(async(password, {req}) => {
        const user = await usersRepo.getOneBy({ email: req.body.email });

        if (!user) {
            throw new Error("Email not found!");
          }

        if (!(await usersRepo.comparePassword(user.password, password)))
            throw new Error("Invalid Password");
    }),
}