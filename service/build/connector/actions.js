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
exports.deleteOrderCreatedExtension = exports.createOrderCreatedExtension = void 0;
// const CART_UPDATE_EXTENSION_KEY = 'myconnector-cartUpdateExtension';
// const CART_DISCOUNT_TYPE_KEY = 'myconnector-cartDiscountType';
const ORDER_CREATED_EXTENSION_KEY = 'myconnector-orderCreatedExtension';
function createOrderCreatedExtension(apiRoot, applicationUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body: { results: extensions }, } = yield apiRoot
            .extensions()
            .get({
            queryArgs: {
                where: `key = "${ORDER_CREATED_EXTENSION_KEY}"`,
            },
        })
            .execute();
        if (extensions.length > 0) {
            const extension = extensions[0];
            yield apiRoot
                .extensions()
                .withKey({ key: ORDER_CREATED_EXTENSION_KEY })
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
                key: ORDER_CREATED_EXTENSION_KEY,
                destination: {
                    type: 'HTTP',
                    url: applicationUrl,
                },
                triggers: [
                    {
                        resourceTypeId: 'order',
                        actions: ['Create'],
                    },
                ],
            },
        })
            .execute();
    });
}
exports.createOrderCreatedExtension = createOrderCreatedExtension;
// export async function createCartUpdateExtension(
//   apiRoot: ByProjectKeyRequestBuilder,
//   applicationUrl: string
// ): Promise<void> {
//   const {
//     body: { results: extensions },
//   } = await apiRoot
//     .extensions()
//     .get({
//       queryArgs: {
//         where: `key = "${CART_UPDATE_EXTENSION_KEY}"`,
//       },
//     })
//     .execute();
//   if (extensions.length > 0) {
//     const extension = extensions[0];
//     await apiRoot
//       .extensions()
//       .withKey({ key: CART_UPDATE_EXTENSION_KEY })
//       .delete({
//         queryArgs: {
//           version: extension.version,
//         },
//       })
//       .execute();
//   }
//   await apiRoot
//     .extensions()
//     .post({
//       body: {
//         key: CART_UPDATE_EXTENSION_KEY,
//         destination: {
//           type: 'HTTP',
//           url: applicationUrl,
//         },
//         triggers: [
//           {
//             resourceTypeId: 'cart',
//             actions: ['Update'],
//           },
//         ],
//       },
//     })
//     .execute();
// }
function deleteOrderCreatedExtension(apiRoot) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body: { results: extensions }, } = yield apiRoot
            .extensions()
            .get({
            queryArgs: {
                where: `key = "${ORDER_CREATED_EXTENSION_KEY}"`,
            },
        })
            .execute();
        if (extensions.length > 0) {
            const extension = extensions[0];
            yield apiRoot
                .extensions()
                .withKey({ key: ORDER_CREATED_EXTENSION_KEY })
                .delete({
                queryArgs: {
                    version: extension.version,
                },
            })
                .execute();
        }
    });
}
exports.deleteOrderCreatedExtension = deleteOrderCreatedExtension;
// export async function deleteCartUpdateExtension(
//   apiRoot: ByProjectKeyRequestBuilder
// ): Promise<void> {
//   const {
//     body: { results: extensions },
//   } = await apiRoot
//     .extensions()
//     .get({
//       queryArgs: {
//         where: `key = "${CART_UPDATE_EXTENSION_KEY}"`,
//       },
//     })
//     .execute();
//   if (extensions.length > 0) {
//     const extension = extensions[0];
//     await apiRoot
//       .extensions()
//       .withKey({ key: CART_UPDATE_EXTENSION_KEY })
//       .delete({
//         queryArgs: {
//           version: extension.version,
//         },
//       })
//       .execute();
//   }
// }
// export async function createCustomCartDiscountType(
//   apiRoot: ByProjectKeyRequestBuilder
// ): Promise<void> {
//   const {
//     body: { results: types },
//   } = await apiRoot
//     .types()
//     .get({
//       queryArgs: {
//         where: `key = "${CART_DISCOUNT_TYPE_KEY}"`,
//       },
//     })
//     .execute();
//   if (types.length > 0) {
//     const type = types[0];
//     await apiRoot
//       .types()
//       .withKey({ key: CART_DISCOUNT_TYPE_KEY })
//       .delete({
//         queryArgs: {
//           version: type.version,
//         },
//       })
//       .execute();
//   }
//   await apiRoot
//     .types()
//     .post({
//       body: {
//         key: CART_DISCOUNT_TYPE_KEY,
//         name: {
//           en: 'Custom type to store a string',
//         },
//         resourceTypeIds: ['cart-discount'],
//         fieldDefinitions: [
//           {
//             type: {
//               name: 'String',
//             },
//             name: 'customCartField',
//             label: {
//               en: 'Custom cart field',
//             },
//             required: false,
//           },
//         ],
//       },
//     })
//     .execute();
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25uZWN0b3IvYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSx1RUFBdUU7QUFDdkUsaUVBQWlFO0FBQ2pFLE1BQU0sMkJBQTJCLEdBQUcsbUNBQW1DLENBQUM7QUFFeEUsU0FBc0IsMkJBQTJCLENBQy9DLE9BQW1DLEVBQ25DLGNBQXNCOztRQUV0QixNQUFNLEVBQ0osSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUM5QixHQUFHLE1BQU0sT0FBTzthQUNkLFVBQVUsRUFBRTthQUNaLEdBQUcsQ0FBQztZQUNILFNBQVMsRUFBRTtnQkFDVCxLQUFLLEVBQUUsVUFBVSwyQkFBMkIsR0FBRzthQUNoRDtTQUNGLENBQUM7YUFDRCxPQUFPLEVBQUUsQ0FBQztRQUViLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUMxQixNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFaEMsTUFBTSxPQUFPO2lCQUNWLFVBQVUsRUFBRTtpQkFDWixPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsMkJBQTJCLEVBQUUsQ0FBQztpQkFDN0MsTUFBTSxDQUFDO2dCQUNOLFNBQVMsRUFBRTtvQkFDVCxPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU87aUJBQzNCO2FBQ0YsQ0FBQztpQkFDRCxPQUFPLEVBQUUsQ0FBQztRQUNmLENBQUM7UUFFRCxNQUFNLE9BQU87YUFDVixVQUFVLEVBQUU7YUFDWixJQUFJLENBQUM7WUFDSixJQUFJLEVBQUU7Z0JBQ0osR0FBRyxFQUFFLDJCQUEyQjtnQkFDaEMsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxNQUFNO29CQUNaLEdBQUcsRUFBRSxjQUFjO2lCQUNwQjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1I7d0JBQ0UsY0FBYyxFQUFFLE9BQU87d0JBQ3ZC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