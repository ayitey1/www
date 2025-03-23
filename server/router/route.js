import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controller/appcontroller.js';
import { registerMail } from '../controller/mailer.js';
import {CompanyDetails} from '../controller/appcontroller.js';


/** POST Methods */

router.route('/registerMail').post(registerMail); // send the email
router.route('/company').post(CompanyDetails); 
router.route('/login').post(controller.login); // login in app
router.route('/details').post(controller.Infodetails); // register user



export default router;
