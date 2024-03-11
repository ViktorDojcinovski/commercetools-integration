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
exports.createCustomCartDiscountType = exports.deleteCartUpdateExtension = exports.createCartUpdateExtension = void 0;
const CART_UPDATE_EXTENSION_KEY = 'myconnector-cartUpdateExtension';
const CART_DISCOUNT_TYPE_KEY = 'myconnector-cartDiscountType';
function createCartUpdateExtension(apiRoot, applicationUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body: { results: extensions }, } = yield apiRoot
            .extensions()
            .get({
            queryArgs: {
                where: `key = "${CART_UPDATE_EXTENSION_KEY}"`,
            },
        })
            .execute();
        if (extensions.length > 0) {
            const extension = extensions[0];
            yield apiRoot
                .extensions()
                .withKey({ key: CART_UPDATE_EXTENSION_KEY })
                .delete({
                queryArgs: {
                    version: extension.version,
                },
            })
                .execute();
        }
        yield apiRoot
            .extensions()
            .post({
            body: {
                key: CART_UPDATE_EXTENSION_KEY,
                destination: {
                    type: 'HTTP',
                    url: applicationUrl,
                },
                triggers: [
                    {
                        resourceTypeId: 'cart',
                        actions: ['Update'],
                    },
                ],
            },
        })
            .execute();
    });
}
exports.createCartUpdateExtension = createCartUpdateExtension;
function deleteCartUpdateExtension(apiRoot) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body: { results: extensions }, } = yield apiRoot
            .extensions()
            .get({
            queryArgs: {
                where: `key = "${CART_UPDATE_EXTENSION_KEY}"`,
            },
        })
            .execute();
        if (extensions.length > 0) {
            const extension = extensions[0];
            yield apiRoot
                .extensions()
                .withKey({ key: CART_UPDATE_EXTENSION_KEY })
                .delete({
                queryArgs: {
                    version: extension.version,
                },
            })
                .execute();
        }
    });
}
exports.deleteCartUpdateExtension = deleteCartUpdateExtension;
function createCustomCartDiscountType(apiRoot) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body: { results: types }, } = yield apiRoot
            .types()
            .get({
            queryArgs: {
                where: `key = "${CART_DISCOUNT_TYPE_KEY}"`,
            },
        })
            .execute();
        if (types.length > 0) {
            const type = types[0];
            yield apiRoot
                .types()
                .withKey({ key: CART_DISCOUNT_TYPE_KEY })
                .delete({
                queryArgs: {
                    version: type.version,
                },
            })
                .execute();
        }
        yield apiRoot
            .types()
            .post({
            body: {
                key: CART_DISCOUNT_TYPE_KEY,
                name: {
                    en: 'Custom type to store a string',
                },
                resourceTypeIds: ['cart-discount'],
                fieldDefinitions: [
                    {
                        type: {
                            name: 'String',
                        },
                        name: 'customCartField',
                        label: {
                            en: 'Custom cart field',
                        },
                        required: false,
                    },
                ],
            },
        })
            .execute();
    });
}
exports.createCustomCartDiscountType = createCustomCartDiscountType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25uZWN0b3IvYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSxNQUFNLHlCQUF5QixHQUFHLGlDQUFpQyxDQUFDO0FBQ3BFLE1BQU0sc0JBQXNCLEdBQUcsOEJBQThCLENBQUM7QUFFOUQsU0FBc0IseUJBQXlCLENBQzdDLE9BQW1DLEVBQ25DLGNBQXNCOztRQUV0QixNQUFNLEVBQ0osSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUM5QixHQUFHLE1BQU0sT0FBTzthQUNkLFVBQVUsRUFBRTthQUNaLEdBQUcsQ0FBQztZQUNILFNBQVMsRUFBRTtnQkFDVCxLQUFLLEVBQUUsVUFBVSx5QkFBeUIsR0FBRzthQUM5QztTQUNGLENBQUM7YUFDRCxPQUFPLEVBQUUsQ0FBQztRQUViLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUMxQixNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFaEMsTUFBTSxPQUFPO2lCQUNWLFVBQVUsRUFBRTtpQkFDWixPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUseUJBQXlCLEVBQUUsQ0FBQztpQkFDM0MsTUFBTSxDQUFDO2dCQUNOLFNBQVMsRUFBRTtvQkFDVCxPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU87aUJBQzNCO2FBQ0YsQ0FBQztpQkFDRCxPQUFPLEVBQUUsQ0FBQztRQUNmLENBQUM7UUFFRCxNQUFNLE9BQU87YUFDVixVQUFVLEVBQUU7YUFDWixJQUFJLENBQUM7WUFDSixJQUFJLEVBQUU7Z0JBQ0osR0FBRyxFQUFFLHlCQUF5QjtnQkFDOUIsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxNQUFNO29CQUNaLEdBQUcsRUFBRSxjQUFjO2lCQUNwQjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1I7d0JBQ0UsY0FBYyxFQUFFLE1B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