import * as Express from 'express';
import * as BodyParser from 'body-parser';

const app = Express();
app.use( BodyParser.urlencoded( { extended: true } ) );
app.use( BodyParser.json() );

export { app };

export function api( $method: ("GET"|"POST"|"DELETE"|"PUT"), $path: string, $listener: ( $req: Express.Request, $res: Express.Response ) => void ){
	switch( $method ){
		case "GET":
		case "POST":
		case "DELETE":
		case "PUT":
			app[ $method.toLowerCase() ]( $path, $listener );
			break;
	}

	console.log( `[${$method}] ${$path}` );
}
