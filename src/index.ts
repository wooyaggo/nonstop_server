import Server from './server';
import Master from './master';

import * as cluster from 'cluster';

if( cluster.isWorker ){
	new Server();
}
else{
	new Master();
}