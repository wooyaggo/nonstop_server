import * as cluster from 'cluster';
import * as os from 'os';
import * as fs from 'fs';

// round robin
const cls = require( "cluster" );
cls.schedulingPolicy = cls.SCHED_RR;

export default class Master{
	private cpuCount = os.cpus().length;
	
	public constructor(){
		this.createWorkers();

		this.watchRestart();
	}
	
	private workers: cluster.Worker[] = [];
	private createWorkers(){
		let i = this.cpuCount;
		while( i-- ){
			this.workers.push( cluster.fork() );
		}
	}

	// watching .restart file for restart server.
	private watchRestart(){
		const restartFile = ".restart";

		// create if not exist.
		if( fs.existsSync( restartFile ) == false ){
			fs.writeFileSync( restartFile, "" );
		}

		// change event.
		fs.watch( ".restart", {}, ( $event, $file ) => {
			this.restart();
		})
	}
	
	private restarting = false;
	private restartCount = 0;
	private restart(){
		// prevent duplicate restart
		if( this.restarting ){
			console.log( 'Restarting is on progress.' );

			return;
		}

		this.restarting = true;
		this.restartCount = this.cpuCount;

		this.restartNext();
	}

	private restartNext(){
		// when restart is done.
		if( this.restartCount == 0 ){
			console.log( 'Restart complete.' );

			this.restarting = false;

			return;
		}

		// get worker one by one from front.
		const worker = this.workers.shift();
		worker.on( "exit", () => {
			this.restartNext();

			// push new wokrer one by one from end.
			this.workers.push( cluster.fork() );
		})
		// send message to close.
		worker.send( "exit" );

		this.restartCount--;
	}
}