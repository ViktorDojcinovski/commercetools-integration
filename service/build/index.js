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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app_1 = require("./app");
// Import logger
const logger_utils_1 = require("./utils/logger.utils");
const axios_client_api_1 = __importDefault(require("./api/axios-client.api"));
const virtualstock_const_1 = require("./consts/virtualstock.const");
const PORT = process.env.PORT || 8080;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!process.env.CTP_VS_USERNAME || !process.env.CTP_VS_PASSWORD) {
        logger_utils_1.logger.error('Missing environment variables');
        process.exit(1);
    }
    const virtualStockClient = (0, axios_client_api_1.default)({
        baseURL: virtualstock_const_1.virtualStockApi_v4,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const response = yield virtualStockClient.post('/token', {
        username: (_a = process.env.CTP_VS_USERNAME) !== null && _a !== void 0 ? _a : '',
        password: (_b = process.env.CTP_VS_PASSWORD) !== null && _b !== void 0 ? _b : '',
    });
    if (response.status !== 200) {
        logger_utils_1.logger.error('Failed to authenticate with virtual stock API. PLease check your credentials.');
        process.exit(1);
    }
    app_1.app.listen(PORT, () => {
        logger_utils_1.logger.info(`⚡️ Service application listening on port ${PORT}`);
    });
});
start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFpQztBQUNqQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDaEIsK0JBQTRCO0FBQzVCLGdCQUFnQjtBQUNoQix1REFBOEM7QUFDOUMsOEVBQWlEO0FBQ2pELG9FQUFpRTtBQUVqRSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFFdEMsTUFBTSxLQUFLLEdBQUcsR0FBUyxFQUFFOztJQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ2pFLHFCQUFNLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBQ0QsTUFBTSxrQkFBa0IsR0FBRyxJQUFBLDBCQUFXLEVBQUM7UUFDckMsT0FBTyxFQUFFLHVDQUFrQjtRQUMzQixPQUFPLEVBQUU7WUFDUCxjQUFjLEVBQUUsa0JBQWtCO1NBQ25DO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxRQUFRLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ3ZELFFBQVEsRUFBRSxNQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxtQ0FBSSxFQUFFO1FBQzNDLFFBQVEsRUFBRSxNQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxtQ0FBSSxFQUFFO0tBQzVDLENBQUMsQ0FBQztJQUVILElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUM1QixxQkFBTSxDQUFDLEtBQUssQ0FDViwrRUFBK0UsQ0FDaEYsQ0FBQztRQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVELFNBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtRQUNwQixxQkFBTSxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUFDO0FBRUYsS0FBSyxFQUFFLENBQUMifQ==