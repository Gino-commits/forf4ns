export class renderController {
    static async renderLogin(req, res){
        const { user } = req.session
        if(!user){
            res.render('login', { isLoggedIn: false })
        } else {
            res.render('login', { isLoggedIn: true })
        }
    }

    static async renderRegistration(req, res){
        const { user } = req.session
        if(!user){
            res.render('register')
        } else {
            res.redirect('/home')
        }
    }

    static async renderHome(req, res){
        const { user } = req.session
        if(user){
            res.render('index', { isLoggedIn: true })
        } else {
            res.redirect('/login')
        }
    }
}
