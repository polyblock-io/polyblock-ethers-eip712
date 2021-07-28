import { keyValueToTypedDataField } from "../infer-types"

test("keyValueToTypedDataField with string value", () => {
    const key1 = "example", value1 = "Hello world"
    const type1 = keyValueToTypedDataField(key1, value1)

    expect(type1).not.toBeNull()
    expect(type1!.name).toBe(key1)
    expect(type1!.type).toBe("string")
})

test("keyValueToTypedDataField with number value", () => {
    const key1 = "example", value1 = 1 
    const type1 = keyValueToTypedDataField(key1, value1)

    expect(type1).not.toBeNull()
    expect(type1!.name).toBe(key1)
    expect(type1!.type).toBe("int32")
})

test("keyValueToTypedDataField with BigNumber value", () => {
    const key1 = "example", value1 = "99999999999999999999999999"
    const type1 = keyValueToTypedDataField(key1, value1)

    expect(type1).not.toBeNull()
    expect(type1!.name).toBe(key1)
    expect(type1!.type).toBe("uint256")
})

test("keyValueToTypedDataField with address value", () => {
    const key1 = "example", value1 = "0x0000000000000000000000000000000000000000"
    const type1 = keyValueToTypedDataField(key1, value1)

    expect(type1).not.toBeNull()
    expect(type1!.name).toBe(key1)
    expect(type1!.type).toBe("address")
})

test("keyValueToTypedDataField with bool value", () => {
    const key1 = "example", value1 = true
    const type1 = keyValueToTypedDataField(key1, value1)

    expect(type1).not.toBeNull()
    expect(type1!.name).toBe(key1)
    expect(type1!.type).toBe("bool")
})

test("keyValueToTypedDataField with object value", () => {
    const key1 = "example", value1 = { "msg": "hello world" }
    const type1 = keyValueToTypedDataField(key1, value1)

    expect(type1).not.toBeNull()
    expect(type1!.name).toBe(key1)
    expect(type1!.type).toBe("Example")
})

test("keyValueToTypedDataField with array value", () => {
    const key1 = "example", value1 = [0,1,2,3,4,5]
    const type1 = keyValueToTypedDataField(key1, value1)

    expect(type1).not.toBeNull()
    expect(type1!.name).toBe(key1)
    expect(type1!.type).toBe("int32[]")
})