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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// Import routes
const service_route_1 = __importDefault(require("./routes/service.route"));
// Import logger
const logger_utils_1 = require("./utils/logger.utils");
const config_utils_1 = require("./utils/config.utils");
const error_middleware_1 = require("./middleware/error.middleware");
// Read env variables
(0, config_utils_1.readConfiguration)();
const PORT = 8080;
// Create the express app
const app = (0, express_1.default)();
app.disable('x-powered-by');
// Define configurations
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Define routes
app.use('/service', service_route_1.default);
// Global error handler
app.use(error_middleware_1.errorMiddleware);
// Listen the application
const server = app.listen(PORT, () => {
    logger_utils_1.logger.info(`⚡️ Service application listening on port ${PORT}`);
});
exports.default = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFpQztBQUNqQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIsc0RBQTJDO0FBQzNDLDhEQUFxQztBQUVyQyxnQkFBZ0I7QUFDaEIsMkVBQW1EO0FBRW5ELGdCQUFnQjtBQUNoQix1REFBOEM7QUFFOUMsdURBQXlEO0FBQ3pELG9FQUFnRTtBQUVoRSxxQkFBcUI7QUFDckIsSUFBQSxnQ0FBaUIsR0FBRSxDQUFDO0FBRXBCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztBQUVsQix5QkFBeUI7QUFDekIsTUFBTSxHQUFHLEdBQVksSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFDL0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUU1Qix3QkFBd0I7QUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFbkQsZ0JBQWdCO0FBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLHVCQUFhLENBQUMsQ0FBQztBQUVuQyx1QkFBdUI7QUFDdkIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxrQ0FBZSxDQUFDLENBQUM7QUFFekIseUJBQXlCO0FBQ3pCLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUNuQyxxQkFBTSxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNsRSxDQUFDLENBQUMsQ0FBQztBQUVILGtCQUFlLE1BQU0sQ0FBQyJ9