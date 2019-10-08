/// <reference path="defs/node.d.ts" />
/// <reference path="defs/mysql.d.ts" />
/// <reference path="defs/colors.d.ts" />
/// <reference path="defs/express.d.ts" />

import * as express from "express";
import http = require('http');
import assets = require("connect-assets");
import bodyParser = require("body-parser");
import path = require('path');
import Logger from './utils/logger';
import Router from './router/Router';
let lang = require('./langs/es_ES.json');

export default class App {

	public static appClient: any;

	public static httpServer: any;

	public static portNumber: number = 8082;

	public static port: string | number;

	private static logger: Logger; 

	private static Router: Router;       
                                                  
	public static Environment(): void {
		try {	

			this.logger = new Logger();
			App.getLogger().logStart.server("MoonLight System @author: ApolloB");
			//this.database = new Database();
			this.loadExpress();
			this.httpServer = http.createServer(this.appClient);
			this.port = process.env.PORT || this.portNumber;
			this.httpServer.listen(this.port);
            App.getLogger().updateTitle("MoonLight, take it easy");
			App.getLogger().logStart.server("Iniciado en el puerto " + this.port);
            App.getLogger().commands();

		} catch(Exception) { App.getLogger().logStart.warning(Exception) }
	}

	public static loadExpress(): void {
		this.appClient = express();
		this.appClient.use(bodyParser.urlencoded({extended:false}));
		this.appClient.use(bodyParser.json());
		this.appClient.set('views', path.join(__dirname, 'views'));
        this.appClient.use(express.static(__dirname + '/public'));
		this.appClient.set('view engine', 'ejs');
        //If you want use Html Extension for views, you can use it uncommented the code down about it
       // this.appClient.engine('html', require('ejs').renderFile);
       // this.appClient.set('view engine', 'html');
		this.appClient.use(assets({
		paths: [
			'public/assets/stylesheets',
			'public/assets/javascript',
			'public/assets/javascript/vendor',
			'public/assets/images',
			'public/assets/images/icons',
			'public/assets/images/tests'
		],
		fingerprinting:true,
		helperContext:global
	}));
		this.Router = new Router();
		this.Router.registerRoutes();
		App.getLogger().logStart.router("Router y lenguajes cargados.");
}

	public static getLogger(): Logger {
		return this.logger;
	}

	public static getLang() {
		return lang;
	}
}

App.Environment();