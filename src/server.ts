import * as http from 'http';
import { app, api } from './core';

export default class Server{
	private server: http.Server;

	public constructor(){
		this.createServer();
		this.listenRestart();
	}

	private createServer(){
		this.registerApi();

		this.server = app.listen( 1500, ()=>{
			console.log( `Server:1500 #${process.pid} is on.` );
		})
	}
	
	private registerApi(){
		api( "GET", "/", ( $req, $res ) => {
			const fix = "=====!!=====";
			console.log( `${process.pid}\t`, fix );
		
			setTimeout( ()=>{
				$res.status( 200 ).end();
			}, 300 );
		})
	}

	private listenRestart(){
		process.on( "message", ( $message ) => {
			if( $message == "exit" ){
				this.server.close( ()=>{
					process.exit();
				})
			}
		})
	}
}