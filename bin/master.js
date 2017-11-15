"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cluster = require("cluster");
const os = require("os");
const fs = require("fs");
// round robin
const cls = require("cluster");
cls.schedulingPolicy = cls.SCHED_RR;
class Master {
    constructor() {
        this.cpuCount = os.cpus().length;
        this.workers = [];
        this.restarting = false;
        this.restartCount = 0;
        this.createWorkers();
        this.watchRestart();
    }
    createWorkers() {
        let i = this.cpuCount;
        while (i--) {
            this.workers.push(cluster.fork());
        }
    }
    watchRestart() {
        const restartFile = ".restart";
        if (fs.existsSync(restartFile) == false) {
            fs.writeFileSync(restartFile, "");
        }
        fs.watch(".restart", {}, ($event, $file) => {
            this.restart();
        });
    }
    restart() {
        if (this.restarting) {
            console.log('Restarting is on progress.');
            return;
        }
        this.restarting = true;
        this.restartCount = this.cpuCount;
        this.restartNext();
    }
    restartNext() {
        if (this.restartCount == 0) {
            console.log('Restart complete.');
            this.restarting = false;
            return;
        }
        const worker = this.workers.shift();
        worker.on("exit", () => {
            this.restartNext();
            this.workers.push(cluster.fork());
        });
        worker.send("exit");
        this.restartCount--;
    }
}
exports.default = Master;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzdGVyLmpzIiwic291cmNlUm9vdCI6IkQ6L1dvcmsvcmVzdGFydF9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibWFzdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQW1DO0FBQ25DLHlCQUF5QjtBQUN6Qix5QkFBeUI7QUFFekIsY0FBYztBQUNkLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBRSxTQUFTLENBQUUsQ0FBQztBQUNqQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztBQUVwQztJQUdDO1FBRlEsYUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFRNUIsWUFBTyxHQUFxQixFQUFFLENBQUM7UUFvQi9CLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUExQnhCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUdPLGFBQWE7UUFDcEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN0QixPQUFPLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUUsQ0FBQztRQUNyQyxDQUFDO0lBQ0YsQ0FBQztJQUVPLFlBQVk7UUFDbkIsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBRS9CLEVBQUUsQ0FBQSxDQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUUsV0FBVyxDQUFFLElBQUksS0FBTSxDQUFDLENBQUEsQ0FBQztZQUMzQyxFQUFFLENBQUMsYUFBYSxDQUFFLFdBQVcsRUFBRSxFQUFFLENBQUUsQ0FBQztRQUNyQyxDQUFDO1FBRUQsRUFBRSxDQUFDLEtBQUssQ0FBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLENBQUUsTUFBTSxFQUFFLEtBQUssRUFBRyxFQUFFO1lBQzdDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7SUFJTyxPQUFPO1FBQ2QsRUFBRSxDQUFBLENBQUUsSUFBSSxDQUFDLFVBQVcsQ0FBQyxDQUFBLENBQUM7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBRSw0QkFBNEIsQ0FBRSxDQUFDO1lBRTVDLE1BQU0sQ0FBQztRQUNSLENBQUM7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFFbEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTyxXQUFXO1FBQ2xCLEVBQUUsQ0FBQSxDQUFFLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBRSxDQUFDLENBQUEsQ0FBQztZQUM1QixPQUFPLENBQUMsR0FBRyxDQUFFLG1CQUFtQixDQUFFLENBQUM7WUFFbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFFeEIsTUFBTSxDQUFDO1FBQ1IsQ0FBQztRQUVELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEMsTUFBTSxDQUFDLEVBQUUsQ0FBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUVuQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUUsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUUsTUFBTSxDQUFFLENBQUM7UUFFdEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JCLENBQUM7Q0FDRDtBQS9ERCx5QkErREMifQ==