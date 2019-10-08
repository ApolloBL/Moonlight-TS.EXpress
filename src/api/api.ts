import App from '../app';
var bodyParser = require("body-parser");

export default class Api {

public constructor() {
    App.appClient.use(bodyParser.urlencoded({ extended: false }));
    App.appClient.use(bodyParser.json());
}
    
}