export interface ITypedDataDomain {
    name?: string;
    version?: string;
    chainId?: number;
    verifyingContract?: string;
    salt?: string;
}

export interface ITypedDataField {
    name: string;
    type: string;
}

export interface IJsonRPCSigner {
    _signTypedData:
    (
        domain: ITypedDataDomain,
        types: Record<string, ITypedDataField[]>,
        value: Record<string, any>
    ) => Promise<string>
}

