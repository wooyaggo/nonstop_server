"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const BodyParser = require("body-parser");
const app = Express();
exports.app = app;
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
function api($method, $path, $listener) {
    switch ($method) {
        case "GET":
        case "POST":
        case "DELETE":
        case "PUT":
            app[$method.toLowerCase()]($path, $listener);
            break;
    }
    console.log(`[${$method}] ${$path}`);
}
exports.api = api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzcy5qcyIsInNvdXJjZVJvb3QiOiJEOi9Xb3JrL3Jlc3RhcnRfc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImNvcmUvZXhwcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUNuQywwQ0FBMEM7QUFFMUMsTUFBTSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7QUFJYixrQkFBRztBQUhaLEdBQUcsQ0FBQyxHQUFHLENBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBRSxDQUFFLENBQUM7QUFDdkQsR0FBRyxDQUFDLEdBQUcsQ0FBRSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUUsQ0FBQztBQUk3QixhQUFxQixPQUFzQyxFQUFFLEtBQWEsRUFBRSxTQUFvRTtJQUMvSSxNQUFNLENBQUEsQ0FBRSxPQUFRLENBQUMsQ0FBQSxDQUFDO1FBQ2pCLEtBQUssS0FBSyxDQUFDO1FBQ1gsS0FBSyxNQUFNLENBQUM7UUFDWixLQUFLLFFBQVEsQ0FBQztRQUNkLEtBQUssS0FBSztZQUNULEdBQUcsQ0FBRSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUUsQ0FBRSxLQUFLLEVBQUUsU0FBUyxDQUFFLENBQUM7WUFDakQsS0FBSyxDQUFDO0lBQ1IsQ0FBQztJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUUsSUFBSSxPQUFPLEtBQUssS0FBSyxFQUFFLENBQUUsQ0FBQztBQUN4QyxDQUFDO0FBWEQsa0JBV0MifQ==