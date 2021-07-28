import { inferTypes } from "../infer-types"

test("inferTypes on simple object", () => {
    const primaryKey = "Message"
    const object = { msg: "Hello world" }
    const types = inferTypes(primaryKey, object)

    expect(types[primaryKey]).not.toBeNull()
    expect(types[primaryKey][0]).not.toBeNull()
    expect(types[primaryKey][0].name).toBe("msg")
    expect(types[primaryKey][0].type).toBe("string")
})

test("inferTypes on simple object with array", () => {
    const primaryKey = "Message"
    const object = { msg: "Hello world", arr: [1,2,3,4,5] }
    const types = inferTypes(primaryKey, object)

    expect(types[primaryKey]).not.toBeNull()
    expect(types[primaryKey].length).toBe(2)
    expect(types[primaryKey][1].name).toBe("arr")
    expect(types[primaryKey][1].type).toBe("int32[]")
})

test("inferTypes on simple object with nested object", () => {
    const primaryKey = "Message"
    const nestedObject = { foo: "bar" }
    const object = { msg: "Hello world", nested: nestedObject }
    const types = inferTypes(primaryKey, object)

    expect(types[primaryKey]).not.toBeNull()
    expect(types[primaryKey].length).toBe(2)
    expect(types["Nested"].length).toBe(1)
    expect(types["Nested"][0].name).toBe("foo")
    expect(types["Nested"][0].type).toBe("string")
})