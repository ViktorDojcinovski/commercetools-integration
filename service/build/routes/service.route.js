"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_utils_1 = require("../utils/logger.utils");
const service_controller_1 = require("../controllers/service.controller");
const serviceRouter = (0, express_1.Router)();
serviceRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, service_controller_1.post)(req, res);
        logger_utils_1.logger.info('Order processed successfully.');
        return res.send();
    }
    catch (error) {
        next(error);
    }
}));
exports.default = serviceRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5yb3V0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvc2VydmljZS5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFDQUFrRTtBQUVsRSx3REFBK0M7QUFDL0MsMEVBQXlEO0FBR3pELE1BQU0sYUFBYSxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO0FBRS9CLGFBQWEsQ0FBQyxJQUFJLENBQ2hCLEdBQUcsRUFDSCxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3hELElBQUksQ0FBQztRQUNILE1BQU0sSUFBQSx5QkFBSSxFQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyQixxQkFBTSxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBRTdDLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQW9CLENBQUMsQ0FBQztJQUM3QixDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQ0YsQ0FBQztBQUVGLGtCQUFlLGFBQWEsQ0FBQyJ9