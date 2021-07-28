import { ITypedDataField } from "./types"
import { capitalize, isBigNumber, isEthereumAddress } from "./text"

/** Infer the EIP-712 types for the provided object recursively.
 * 
 * @param primaryKey The name of the object. If undefined defaults to 'Message'
 * @param object The object to infer the types from. 
 * @param types optional types to append newly inferred types too. (Used internally for recursion).
*/
export const inferTypes = (
    primaryKey: string = "Message",
    object: Record<string, any>,
    types?: Record<string, Array<ITypedDataField>>
) => {
    types = types || {}
    types[primaryKey] = []

    const keys = Object.keys(object)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = object[key]
        const typedDataField = keyValueToTypedDataField(key, value, types)
        // if type was found add it to the type list
        if (typedDataField === null) continue
        types[primaryKey].push(typedDataField)

    }

    return types
}

/** convert key value pair into EIP-712 TypedDataField.
 * @param types optional type map to support arrays and nested objects, which require multiple types. Used by infertypes.
 */
export const keyValueToTypedDataField = (
    key: string,
    value: any,
    types?: Record<string, Array<ITypedDataField>>
) => {
    let type: string = (typeof value)

    // if undefined or unsupported type
    if (type === "undefined" || type === "function" || type === "symbol" || value === undefined) {
        return null
    }

    // if address
    else if (type === "string" && isEthereumAddress(value)) {
        type = "address"
    }

    // if bigint
    else if (type === "bigint") {
        type = "int256"
        if (value as bigint > 0) type = "uint256"
    }

    // big num 
    else if (type === "string" && value.length > 0 && isBigNumber(value)) {
        type = "uint256"
        if (value[0] == "-") type = "int256"
    }

    // if number
    else if (type === "number") {
        type = "string"
        if (value % 1 == 0) type = "int32"
        // TODO: handle numbers better
    }

    // if boolean
    else if (type === "boolean") {
        type = "bool"
    }

    // if is an object or array
    else if (type === "object") {
        if (Array.isArray(value) && value.length > 0) {
            // TODO: ensure all elements in array are of the same type
            const elem = keyValueToTypedDataField(key, value[0], types)!
            type = `${elem.type}[]`
        }
        else {
            inferTypes(capitalize(key), value, types)
            type = capitalize(key)
        }
    }

    return { name: key, type: type }
}

