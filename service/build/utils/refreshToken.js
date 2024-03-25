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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const custom_error_1 = __importDefault(require("../errors/custom.error"));
const refreshToken = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const refresh_token = process.env.REFRESH_TOKEN;
    const refresh_response = yield client.post('/token/refresh', {
        refresh: refresh_token,
    });
    if (refresh_response.status !== 200) {
        throw new custom_error_1.default(500, 'Failed to refresh token');
    }
    const new_access_token = refresh_response.data.access;
    process.env.AUTH_TOKEN = new_access_token;
    client.defaults.headers['Authorization'] =
        `Bearer ${new_access_token}`;
});
exports.refreshToken = refreshToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmcmVzaFRva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3JlZnJlc2hUb2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSwwRUFBaUQ7QUFFMUMsTUFBTSxZQUFZLEdBQUcsQ0FBTyxNQUFhLEVBQUUsRUFBRTtJQUNsRCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztJQUNoRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtRQUMzRCxPQUFPLEVBQUUsYUFBYTtLQUN2QixDQUFDLENBQUM7SUFFSCxJQUFJLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNwQyxNQUFNLElBQUksc0JBQVcsQ0FBQyxHQUFHLEVBQUUseUJBQXlCLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0QsTUFBTSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLGdCQUFnQixDQUFDO0lBQ3pDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBZSxDQUFDLGVBQWUsQ0FBQztRQUMvQyxVQUFVLGdCQUFnQixFQUFFLENBQUM7QUFDakMsQ0FBQyxDQUFBLENBQUM7QUFiVyxRQUFBLFlBQVksZ0JBYXZCIn0=