const controller = {
    
    showRegistrationForm: (req, res) => {
        res.render('pages/register')
    },

    showLoginForm:(req, res)=> {
        res.render('pages/login') 
    }
}
module.exports = controller