"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const master_1 = require("./master");
const cluster = require("cluster");
if (cluster.isWorker) {
    new server_1.default();
}
else {
    new master_1.default();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiRDovV29yay9yZXN0YXJ0X3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUE4QjtBQUM5QixxQ0FBOEI7QUFFOUIsbUNBQW1DO0FBRW5DLEVBQUUsQ0FBQSxDQUFFLE9BQU8sQ0FBQyxRQUFTLENBQUMsQ0FBQSxDQUFDO0lBQ3RCLElBQUksZ0JBQU0sRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQUNELElBQUksQ0FBQSxDQUFDO0lBQ0osSUFBSSxnQkFBTSxFQUFFLENBQUM7QUFDZCxDQUFDIn0=