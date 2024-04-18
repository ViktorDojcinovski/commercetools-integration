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
exports.orderController = exports.post = void 0;
const custom_error_1 = __importDefault(require("../errors/custom.error"));
const axios_client_api_1 = __importDefault(require("../api/axios-client.api"));
const virtualstock_const_1 = require("../consts/virtualstock.const");
const order_utils_1 = require("../utils/order.utils");
const refreshToken_utils_1 = require("../utils/refreshToken.utils");
const logger_utils_1 = require("../utils/logger.utils");
/**
 * Exposed service endpoint.
 * - Receives a POST request, parses the action and the controller
 * and returns it to the correct controller. We should be use 3. `Cart`, `Order` and `Payments`
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @returns
 */
const post = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = request;
    const { resource } = body;
    logger_utils_1.logger.info(JSON.stringify(resource));
    if (!resource) {
        throw new custom_error_1.default(400, 'Bad request. Missing body resource parameter.');
    }
    if (resource.typeId !== 'order') {
        throw new custom_error_1.default(400, `Bad request. Allowed value is 'order'.`);
    }
    const virtualStockApiClient = (0, axios_client_api_1.default)({
        baseURL: virtualstock_const_1.virtualStockApi_v4,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        },
    });
    try {
        const data = yield orderController(body, virtualStockApiClient);
        if (data && data.statusCode === 200) {
            response.status(data.statusCode);
            return;
        }
    }
    catch (error) {
        if (error instanceof Error) {
            throw new custom_error_1.default(error.statusCode || 500, error.message, error.errors);
        }
    }
});
exports.post = post;
/**
 *
 * @param resource
 * @param client
 * @returns OrderControllerResponse
 */
const orderController = (body, client) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const supplierRestID = yield (0, order_utils_1.mapChannel)(Object.keys(body.resource.obj.lineItems[0].variant.availability.channels)[0]);
    const order = (0, order_utils_1.mapOrder)(body, supplierRestID);
    try {
        yield client.post('/orders/?format=json', order);
    }
    catch (error) {
        if (error.response) {
            const { response: { status }, } = error;
            switch (status) {
                case 500:
                    throw new custom_error_1.default(500, 'Failed to process the order.', error.response.data.error);
                case 401: {
                    logger_utils_1.logger.info('...refreshing token');
                    try {
                        const updatedClient = yield (0, refreshToken_utils_1.refreshToken)(client);
                        yield updatedClient.post('/orders/?format=json', order);
                        break;
                    }
                    catch (error) {
                        try {
                            const response = yield client.post('/token', {
                                username: (_a = process.env.CTP_VS_USERNAME) !== null && _a !== void 0 ? _a : '',
                                password: (_b = process.env.CTP_VS_PASSWORD) !== null && _b !== void 0 ? _b : '',
                            });
                            process.env.AUTH_TOKEN = response.data.access;
                            process.env.REFRESH_TOKEN = response.data.refresh;
                            const virtualStockApiClient = (0, axios_client_api_1.default)({
                                baseURL: virtualstock_const_1.virtualStockApi_v4,
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
                                },
                            });
                            yield virtualStockApiClient.post('/orders/?format=json', order);
                            break;
                        }
                        catch (error) {
                            throw new custom_error_1.default(error.response.status, 'Failed to refresh token or to process the order. Please try again later.', error.response.data.error);
                        }
                    }
                }
                default:
                    throw new custom_error_1.default(status, error.response.data.error);
            }
        }
        else {
            throw new custom_error_1.default(500, 'Internal server error. Please try again later.');
        }
    }
    // const updateAction: UpdateAction = {
    //   action: 'Create',
    //   updateProductData: false,
    // };
    // updateActions.push(updateAction);
    const data = {
        statusCode: 200,
        // actions: updateActions,
    };
    return data;
});
exports.orderController = orderController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL3NlcnZpY2UuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFHQSwwRUFBaUQ7QUFDakQsK0VBQWtEO0FBRWxELHFFQUFrRTtBQUNsRSxzREFBNEQ7QUFDNUQsb0VBQTJEO0FBQzNELHdEQUErQztBQUUvQzs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sSUFBSSxHQUFHLENBQU8sT0FBZ0IsRUFBRSxRQUFrQixFQUFFLEVBQUU7SUFDMUQsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUN6QixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBRTFCLHFCQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUV0QyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDZCxNQUFNLElBQUksc0JBQVcsQ0FBQyxHQUFHLEVBQUUsK0NBQStDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLE1BQU0sSUFBSSxzQkFBVyxDQUFDLEdBQUcsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxNQUFNLHFCQUFxQixHQUFHLElBQUEsMEJBQVcsRUFBQztRQUN4QyxPQUFPLEVBQUUsdUNBQWtCO1FBQzNCLE9BQU8sRUFBRTtZQUNQLGNBQWMsRUFBRSxrQkFBa0I7WUFDbEMsYUFBYSxFQUFFLFVBQVUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7U0FDbEQ7S0FDRixDQUFDLENBQUM7SUFFSCxJQUFJLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxNQUFNLGVBQWUsQ0FBQyxJQUFJLEVBQUUscUJBQXFCLENBQUMs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