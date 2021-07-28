# polyblock-ethers-eip712

Easily create and sign EIP712 typed messages. (With basic type inference). Supports ethers.js v5, but can be
made to work with other libs.

# Getting started 

**Install**
```bash
npm install --save polyblock-io/polyblock-ethers-eip712
```

**Sign**
```typescript
const sig = new EIP712Message({greeting: "Hello World"}).sign(myWallet)
```

# Signing messages

You can sign a message using `ethers.providers.JsonRpcSigner`, `ethers.Wallet` or other object which
implements `ISigner`. 

```typescript
import {EIP712Message} from "polyblock-ethers-eip712"
import {Wallet} from "ethers"

// create the message 
const message = new EIP712Message({greeting: "Hello World"})

// get the generated types
const types = message.types 

// sign the typed message
const wallet = Wallet.createRandom()
const signature = await message.sign(wallet)
```

# Verifying messages 

You can verify messages using the inferred types and domain.

```typescript
import {EIP712Message} from "polyblock-ethers-eip712"
import {Wallet, utils} from "ethers"

// create the message 
const message = new EIP712Message({greeting: "Hello World"})

// sign the typed message
const wallet = Wallet.createRandom()
const signature = await message.sign(wallet)

// verify the signature
const recoveredAddress = utils.verifyTypedData(message.domain, message.types, message.message, signature)
if (recoveredAddress === wallet.address) {
    // ... signature is valid
}
```