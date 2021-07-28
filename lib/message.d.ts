import { ISigner, ITypedDataDomain, ITypedDataField } from "./types";
export declare class EIP712Message {
    readonly message: Record<string, any>;
    readonly types: Record<string, Array<ITypedDataField>>;
    readonly domain: ITypedDataDomain;
    constructor(message: Record<string, any>, types?: Record<string, Array<ITypedDataField>>, domain?: ITypedDataDomain);
    sign(signer: ISigner): Promise<string>;
}
//# sourceMappingURL=message.d.ts.map