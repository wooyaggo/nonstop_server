"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
class Server {
    constructor() {
        this.createServer();
        this.listenRestart();
    }
    createServer() {
        this.registerApi();
        this.server = core_1.app.listen(1500, () => {
            console.log(`Server:1500 #${process.pid} is on.`);
        });
    }
    registerApi() {
        core_1.api("GET", "/", ($req, $res) => {
            const fix = "=====!!=====";
            console.log(`${process.pid}\t`, fix);
            setTimeout(() => {
                $res.status(200).end();
            }, 300);
        });
    }
    listenRestart() {
        process.on("message", ($message) => {
            if ($message == "exit") {
                this.server.close(() => {
                    process.exit();
                });
            }
        });
    }
}
exports.default = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IkQ6L1dvcmsvcmVzdGFydF9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsaUNBQWtDO0FBRWxDO0lBR0M7UUFDQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTyxZQUFZO1FBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsTUFBTSxHQUFHLFVBQUcsQ0FBQyxNQUFNLENBQUUsSUFBSSxFQUFFLEdBQUUsRUFBRTtZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFFLGdCQUFnQixPQUFPLENBQUMsR0FBRyxTQUFTLENBQUUsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7SUFFTyxXQUFXO1FBQ2xCLFVBQUcsQ0FBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUUsSUFBSSxFQUFFLElBQUksRUFBRyxFQUFFO1lBQ2pDLE1BQU0sR0FBRyxHQUFHLGNBQWMsQ0FBQztZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBRSxDQUFDO1lBRXZDLFVBQVUsQ0FBRSxHQUFFLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBRSxHQUFHLENBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMxQixDQUFDLEVBQUUsR0FBRyxDQUFFLENBQUM7UUFDVixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7SUFFTyxhQUFhO1FBQ3BCLE9BQU8sQ0FBQyxFQUFFLENBQUUsU0FBUyxFQUFFLENBQUUsUUFBUSxFQUFHLEVBQUU7WUFDckMsRUFBRSxDQUFBLENBQUUsUUFBUSxJQUFJLE1BQU8sQ0FBQyxDQUFBLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFFLEdBQUUsRUFBRTtvQkFDdEIsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNoQixDQUFDLENBQUMsQ0FBQTtZQUNILENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7Q0FDRDtBQXBDRCx5QkFvQ0MifQ==