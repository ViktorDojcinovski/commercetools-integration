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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const create_client_1 = require("../client/create.client");
const assert_utils_1 = require("../utils/assert.utils");
const actions_1 = require("./actions");
const CONNECT_APPLICATION_URL_KEY = 'CONNECT_SERVICE_URL';
function postDeploy(properties) {
    return __awaiter(this, void 0, void 0, function* () {
        const applicationUrl = properties.get(CONNECT_APPLICATION_URL_KEY);
        (0, assert_utils_1.assertString)(applicationUrl, CONNECT_APPLICATION_URL_KEY);
        const apiRoot = (0, create_client_1.createApiRoot)();
        // await createCartUpdateExtension(apiRoot, applicationUrl);
        // await createCustomCartDiscountType(apiRoot);
        yield (0, actions_1.createOrderCreatedExtension)(apiRoot, applicationUrl);
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const properties = new Map(Object.entries(process.env));
            yield postDeploy(properties);
        }
        catch (error) {
            (0, assert_utils_1.assertError)(error);
            process.stderr.write(`Post-deploy failed: ${error.message}`);
            process.exitCode = 1;
        }
    });
}
run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC1kZXBsb3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29ubmVjdG9yL3Bvc3QtZGVwbG95LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQTRCO0FBQzVCLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIsMkRBQXdEO0FBQ3hELHdEQUFrRTtBQUNsRSx1Q0FJbUI7QUFFbkIsTUFBTSwyQkFBMkIsR0FBRyxxQkFBcUIsQ0FBQztBQUUxRCxTQUFlLFVBQVUsQ0FBQyxVQUFnQzs7UUFDeEQsTUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBRW5FLElBQUEsMkJBQVksRUFBQyxjQUFjLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztRQUUxRCxNQUFNLE9BQU8sR0FBRyxJQUFBLDZCQUFhLEdBQUUsQ0FBQztRQUNoQyw0REFBNEQ7UUFDNUQsK0NBQStDO1FBQy9DLE1BQU0sSUFBQSxxQ0FBMkIsRUFBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDN0QsQ0FBQztDQUFBO0FBRUQsU0FBZSxHQUFHOztRQUNoQixJQUFJLENBQUM7WUFDSCxNQUFNLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsSUFBQSwwQkFBVyxFQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHVCQUF1QixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUM3RCxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUN2QixDQUFDO0lBQ0gsQ0FBQztDQUFBO0FBRUQsR0FBRyxFQUFFLENBQUMifQ==