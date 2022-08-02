const userValidators = require('../../validators/users')
const userModel = require('../../models/users/users')
const bcrypt = require('bcrypt')

const controller = {
    
    showRegistrationForm: (req, res) => {
        res.render('pages/register')
    },

    register: async (req, res) => {
        //validations
        // const validationResults = userValidators.registerValidator.validate(req.body)
        // if (validationResults.error){
        //     res.send(validationResults.error)
        //     return
        // }
        // const validatedResults = validationResults.value

        // //ensure that password and confirm_password matches
        // if (valudatedResults.password !== validatedResults.confirm_password) {
        //     res.send('Password do not match')
        //     return
        // }

        // //hashing the password
        //const hash = await bcrypt.hash(validatedResilts.password, 10)
        console.log('req.body here', req.body)
        const hash=await bcrypt.hash(req.body.password, 10)
        try{
            await userModel.create({
                username: req.body.username,
                email: req.body.email,
                password : hash,
            })
        } catch(err) {
            console.log('error', err)
            res.send('Error creating user')
            return
        }
        res.redirect('users/login')
    },   

    showLoginForm:(req, res)=> {
        res.render('pages/login') 
    },

    login: async(req,res) => {
        const validatedResults =req.body
        console.log('req.body aft button press:', validatedResults)
        let user = null
        

        try{
            user = await userModel.findOne({email: validatedResults.email})

        } catch (err){
            res.send('failed to get user')
        }

        //using bcrypt to compare given pw with DB stored pw
        const pwMatches = await bcrypt.compare(validatedResults.password, user.password)
        if(!pwMatches) {
            res.send('incorrect password match')
            return
        }
        //log user in by creating a session
        req.session.regenerate(function(err){
            if(err) {
                res.send('unable to regenerate session')
                return
            }
            //store user info in session, typically a userid
            req.session.user = user.email

            //save the session before redirection so pageload does not happen before session is saved
            req.session.save(function(err) {
                if (err){
                    res.send('unable to save session')
                    return
                }
                res.redirect('/users/profile')
            })
        })
    }

}
module.exports = controller