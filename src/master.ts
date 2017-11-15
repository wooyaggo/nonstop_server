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

	private watchRestart(){
		const restartFile = ".restart";

		if( fs.existsSync( restartFile ) == false ){
			fs.writeFileSync( restartFile, "" );
		}

		fs.watch( ".restart", {}, ( $event, $file ) => {
			this.restart();
		})
	}
	
	private restarting = false;
	private restartCount = 0;
	private restart(){
		if( this.restarting ){
			console.log( 'Restarting is on progress.' );

			return;
		}

		this.restarting = true;
		this.restartCount = this.cpuCount;

		this.restartNext();
	}

	private restartNext(){
		if( this.restartCount == 0 ){
			console.log( 'Restart complete.' );

			this.restarting = false;

			return;
		}

		const worker = this.workers.shift();
		worker.on( "exit", () => {
			this.restartNext();

			this.workers.push( cluster.fork() );
		})
		worker.send( "exit" );

		this.restartCount--;
	}
}