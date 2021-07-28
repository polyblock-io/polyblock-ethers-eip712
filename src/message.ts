import { inferTypes } from "./infer-types";
import { ISigner, ITypedDataDomain, ITypedDataField } from "./types";

export class EIP712Message {

    readonly message: Record<string, any>
    readonly types: Record<string, Array<ITypedDataField>>
    readonly domain: ITypedDataDomain

    constructor(
        message: Record<string, any>,
        types?: Record<string, Array<ITypedDataField>>,
        domain?: ITypedDataDomain,
    ) {
        this.message = message
        this.types = types || inferTypes("Message", message)
        this.domain = domain || {}
    }

    sign(signer: ISigner) {
        return signer._signTypedData(this.domain, this.types, this.message)
    }
}