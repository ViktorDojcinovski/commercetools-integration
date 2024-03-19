"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
exports.default = ({ baseURL, headers, auth }) => {
    const client = axios_1.default.create({
        baseURL,
        headers,
        auth,
    });
    return client;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhpb3MtY2xpZW50LmFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvYXhpb3MtY2xpZW50LmFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQVcxQixrQkFBZSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQVcsRUFBRSxFQUFFO0lBQ3JELE1BQU0sTUFBTSxHQUFHLGVBQUssQ0FBQyxNQUFNLENBQUM7UUFDMUIsT0FBTztRQUNQLE9BQU87UUFDUCxJQUFJO0tBQ0wsQ0FBQyxDQUFDO0lBRUgsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDIn0=