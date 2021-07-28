import { ITypedDataField } from "./types";
/** Infer the EIP-712 types for the provided object recursively.
 *
 * @param primaryKey The name of the object. If undefined defaults to 'Message'
 * @param object The object to infer the types from.
 * @param types optional types to append newly inferred types too. (Used internally for recursion).
*/
export declare const inferTypes: (primaryKey: string | undefined, object: Record<string, any>, types?: Record<string, ITypedDataField[]> | undefined) => Record<string, ITypedDataField[]>;
/** convert key value pair into EIP-712 TypedDataField.
 * @param types optional type map to support arrays and nested objects, which require multiple types. Used by infertypes.
 */
export declare const keyValueToTypedDataField: (key: string, value: any, types?: Record<string, ITypedDataField[]> | undefined) => {
    name: string;
    type: string;
} | null;
//# sourceMappingURL=infer-types.d.ts.map