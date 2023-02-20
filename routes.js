const express = require('express')

const UserController = require('./controllers/UserController');
const SkillsController = require('./controllers/SkillsController')
const HobbyController = require('./controllers/HobbyController')
const TicketController = require('./controllers/TicketController')
const HomeController = require('./controllers/HomeController')

const { checkAuth } = require('./middlewares');
const logger = require('./logger');

const router = express.Router();

// home related routes
router.post('/fetch-home-feeds',checkAuth,HomeController.HomeFeed)

// user related routes
router.post('/login',UserController.login)
router.post('/register-refugee',UserController.register)
router.post('/register-sponsor',UserController.register)
router.get('/getAllUsers',checkAuth,UserController.getAllUsers)
router.get('/user-detail/:id',checkAuth,UserController.detail)

// skills related routes
router.post('/create-skill',checkAuth,SkillsController.create)
router.get('/skills-list',SkillsController.getList)
router.get('/skill-detail/:id',checkAuth,SkillsController.getDetail)
router.post('/update-skill/:id',checkAuth,SkillsController.update)
router.get('/delete-skill/:id',checkAuth,SkillsController.deleteData)

// hobby related routes
router.post('/create-hobby',checkAuth,HobbyController.create)
router.get('/hobby-list',HobbyController.getList)
router.get('/hobby-detail/:id',checkAuth,HobbyController.getDetail)
router.post('/update-hobby/:id',checkAuth,HobbyController.update)
router.get('/delete-hobby/:id',checkAuth,HobbyController.deleteData)

// ticket routes
router.post('/create-ticket',checkAuth,TicketController.create)
router.get('/all-tickets',checkAuth,TicketController.getAll)
router.get('/ticket-detail/:id',checkAuth,TicketController.detail)
router.get('/change-ticket-status/:id/:status',checkAuth,TicketController.changeStatus)

// country routes
router.get('/country-list',async (req,res) => {
    let status = 500
    let message = "Oops something went wrong!"
    let list = []

    try {
        await knex("countries").then(response => list = response)
        status = 200
        message = "Country fetched successfully!"
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({status,message,list})
})

module.exports = router