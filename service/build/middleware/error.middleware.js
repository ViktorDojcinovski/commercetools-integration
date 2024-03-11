"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const custom_error_1 = __importDefault(require("../errors/custom.error"));
/**
 * Middleware for error handling
 * @param error The error object
 * @param req The express request
 * @param res The Express response
 * @param next
 * @returns
 */
const errorMiddleware = (error, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    if (error instanceof custom_error_1.default) {
        if (typeof error.statusCode === 'number') {
            res.status(error.statusCode).json({
                message: error.message,
                errors: error.errors,
            });
            return;
        }
    }
    res.status(500).send('Internal server error');
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlL2Vycm9yLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsMEVBQWlEO0FBRWpEOzs7Ozs7O0dBT0c7QUFDSSxNQUFNLGVBQWUsR0FBRyxDQUM3QixLQUEwQixFQUMxQixHQUFZLEVBQ1osR0FBYTtBQUNiLDZEQUE2RDtBQUM3RCxJQUFrQixFQUNsQixFQUFFO0lBQ0YsSUFBSSxLQUFLLFlBQVksc0JBQVcsRUFBRSxDQUFDO1FBQ2pDLElBQUksT0FBTyxLQUFLLENBQUMsVUFBVSxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQ3pDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDaEMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2dCQUN0QixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07YUFDckIsQ0FBQyxDQUFDO1lBRUgsT0FBTztRQUNULENBQUM7SUFDSCxDQUFDO0lBRUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUNoRCxDQUFDLENBQUM7QUFuQlcsUUFBQSxlQUFlLG1CQW1CMUIifQ==