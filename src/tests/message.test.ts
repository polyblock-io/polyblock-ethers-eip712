import { inferTypes } from "../infer-types"
import { EIP712Message } from "../message"
import {utils, Wallet} from "ethers"

test("EIP712Message.types with simple message, no provided types", () => {
    const primaryKey = "Message"
    const data = { "hello": "world" }
    const message = new EIP712Message(data)

    const types = inferTypes(primaryKey, data)
    expect(message.types).toMatchObject(types)
})

test("EIP712Message signing message, no provided types", async () => {
    const primaryKey = "Message"
    const data = { "hello": "world" }
    const message = new EIP712Message(data)

    const wallet = Wallet.createRandom()
    const signature = await message.sign(wallet)

    expect(signature).not.toBeNull()
    expect(signature.length).toBeGreaterThan(20)
})

test("EIP712Message sign and verify message, no provided types", async () => {
    const primaryKey = "Message"
    const data = { "hello": "world" }
    const message = new EIP712Message(data)

    const wallet = Wallet.createRandom()
    const signature = await message.sign(wallet)

    expect(signature).not.toBeNull()
    expect(signature.length).toBeGreaterThan(20)

    const recoveredAddress = utils.verifyTypedData(message.domain, message.types, message.message, signature)
    expect(recoveredAddress).toBe(wallet.address)
})