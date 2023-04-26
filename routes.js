const express = require('express')

const UserController = require('./controllers/UserController');
const SkillsController = require('./controllers/SkillsController')
const HobbyController = require('./controllers/HobbyController')
const TicketController = require('./controllers/TicketController')
const HomeController = require('./controllers/HomeController')
const JobController = require('./controllers/JobController')
const ApplyJobController = require('./controllers/ApplyJobController')
const DashboardController = require('./controllers/DashboardController')
const BidController  = require('./controllers/BidController');
const BootCampController = require('./controllers/BootCampController');

const { checkAuth } = require('./middlewares');
const logger = require('./logger');

const router = express.Router();

// home related routes
router.post('/fetch-home-feeds',checkAuth,HomeController.HomeFeed)
router.post('/fetch-home-jobs',checkAuth,HomeController.HomeFeedJobs)

// user related routes
router.post('/login',UserController.login)
router.post('/register-refugee',UserController.register)
router.post('/register-sponsor',UserController.register)
router.get('/verifyemail/:token',UserController.verifyEmail)
router.get('/resendVerification/:email',UserController.resendVerification)
router.get('/getAllUsers',checkAuth,UserController.getAllUsers)
router.get('/user-detail/:id',checkAuth,UserController.detail)
router.post('/resetPassword',UserController.resetPassword)
router.post('/change-password',checkAuth,UserController.changePassword)
router.get('/change-user-status/:id/:status',checkAuth,UserController.changeStatus)

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

// job related routes
router.post('/create-job',checkAuth,JobController.create)
router.get('/getAllJobs',checkAuth,JobController.getAllJobs)
router.get('/job-details/:id',checkAuth,JobController.getDetail)
router.post('/update-job/:id',checkAuth,JobController.update)
router.get('/change-job-status/:id/:status',checkAuth,JobController.changeStatus)
router.get('/job-applicant-list/:id',checkAuth,JobController.JobApplicantList)
router.post('/apply-job/:id',checkAuth,ApplyJobController.apply)
router.get('/get-state-by-country/:country_id', JobController.getStateByCountry)
router.get('/get-city-by-state/:state_id', JobController.getCityByState)
router.get('/delete-job/:id', JobController.deleteJobDtata)

//Bid Routes

router.post('/create-bid', checkAuth, BidController.createBid)
router.get('/my-bids', checkAuth, BidController.myBids)

//BootCamp Routes

router.post('/submit-topic', checkAuth, BootCampController.submitTopic)
router.get('/get-list', checkAuth, BootCampController.getList)
router.get('/get-details', checkAuth, BootCampController.getDetail)

// dashboard routes
router.get('/dashboard-count',checkAuth,DashboardController.getCount)

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