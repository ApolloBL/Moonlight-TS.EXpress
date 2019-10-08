import IRouter from "../IRouter";
import Router from "../Router";
import * as express from "express";
import App from '../../app';
export default class renderIndex extends IRouter {
	public router: any;
	public constructor(){
		super();
	}
	public render(): Router {
		this.router = express();
		this.router.get('/', (req, res) => {
			  res.render('index', {
               title: App.getLang().lang.title,
               slogan: App.getLang().lang.slogan

              });
			  res.status(200);

		});
		return this.router;
	}
}