import * as express from "express";
import App from "../app";
import renderIndex from "./index/renderIndex";
import renderRegister from "./register/renderRegister";

export default class Router {

	public registerRoutes(): void {
		App.appClient.use(new renderIndex().render());
		App.appClient.use(new renderRegister().render());
	}
}

