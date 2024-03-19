"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// Import routes
const service_route_1 = __importDefault(require("./routes/service.route"));
const config_utils_1 = require("./utils/config.utils");
const error_middleware_1 = require("./middleware/error.middleware");
dotenv.config();
// Read env variables
(0, config_utils_1.readConfiguration)();
// Create the express app
const app = (0, express_1.default)();
exports.app = app;
app.disable('x-powered-by');
// Define configurations
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Define routes
app.use('/service', service_route_1.default);
// Global error handler
app.use(error_middleware_1.errorMiddleware);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFpQztBQUNqQyxzREFBMkM7QUFDM0MsOERBQXFDO0FBRXJDLGdCQUFnQjtBQUNoQiwyRUFBbUQ7QUFFbkQsdURBQXlEO0FBQ3pELG9FQUFnRTtBQUVoRSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIscUJBQXFCO0FBQ3JCLElBQUEsZ0NBQWlCLEdBQUUsQ0FBQztBQUVwQix5QkFBeUI7QUFDekIsTUFBTSxHQUFHLEdBQVksSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFhdEIsa0JBQUc7QUFaWixHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRTVCLHdCQUF3QjtBQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUMzQixHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUVuRCxnQkFBZ0I7QUFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsdUJBQWEsQ0FBQyxDQUFDO0FBRW5DLHVCQUF1QjtBQUN2QixHQUFHLENBQUMsR0FBRyxDQUFDLGtDQUFlLENBQUMsQ0FBQyJ9