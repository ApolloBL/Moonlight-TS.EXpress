import colors = require('colors');
let rl = require("readline").createInterface(process.stdin, process.stdout);
export default class Logger {
  public logStart:any;
  public logMsg: any;
  public commandsList: any;
  public static cmd_red_color: string = "\u001B[31m";
  public static cmd_purple_color: string = "\u001B[35m";
  public static cmd_blue_color: string = "\u001B[34m";
  public static cmd_white_color: string = "\u001B[37m";
  public static cmd_yellow_color: string = "\u001B[33m";
  public static cmd_reset_color: string = "\u001B[0m";

  public  constructor() {
    this.logStart = {
      server: (line: Object) => {
        this.logType(colors.gray("[SERVER] ") + line.toString());
      },
      database: (line: Object) => {
        this.logType(colors.gray("[DATABASE] ") + line.toString());
      },
      router: (line: Object) => {
        this.logType(colors.gray("[ROUTER] ") + line.toString());
      },
      warning: (line: Object) => {
        this.logType(colors.gray("[WARNING] ") + line.toString());
      },
      socket: (line: Object) => {
        this.logType(colors.gray("[SOCKET] ") + line.toString());
      },
      logo: (line: Object) => {
        this.logType(colors.gray(line.toString()));
      },
      cmd: (line: Object, warning: boolean) => {
        console.log();
        this.logType(colors.gray("[CMD] ") + (warning ? Logger.cmd_reset_color + Logger.cmd_red_color : "") + line.toString());
        console.log();
      },
      empty: () => { console.log(); }
    }
  }

  public logType(line: Object){
    console.log(line + Logger.cmd_reset_color);
  }

  public commands(): void{
    let output: string;
    let isWarning: boolean = false;
    rl.on("line", (event) => {
      switch (event) {
        case "about":
          output = "Moonlight.js is a micropotent application created in nodejs by ApolloB";
          break;
        case "shutdown":
          this.shutdown();
          break;
        default:
          output = "Command non-existent";
          isWarning = true;
          break;
      }
      this.logStart.cmd(output, isWarning);
      isWarning = false;
    });
  }

  public shutdown(): void{
    process.exit();
  }

  public updateTitle(title: string): void{
  	process.title = title.toUpperCase();
    }
}






