import IRouter from "../IRouter";
import Router from "../Router";
import * as express from "express";

export default class renderRegister extends IRouter {
	public router: any;

	public constructor(){
		super();
	}
	public render(): Router {
		this.router = express();
		this.router.get('/create/account', (req, res) => {
			res.render('register');
			res.status(200);

		});
		return this.router;
	}
}