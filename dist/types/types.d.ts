import * as firebase from 'firebase';
declare type Query = firebase.firestore.Query;
declare type QuerySnapshot = firebase.firestore.QuerySnapshot;
declare type GetOptions = firebase.firestore.GetOptions;
declare type Firestore = firebase.firestore.Firestore;
declare type QueryListenOptions = firebase.firestore.QueryListenOptions;
declare type DocumentListenOptions = firebase.firestore.DocumentListenOptions;
declare type DocumentReference = firebase.firestore.DocumentReference;
declare type CollectionReference = firebase.firestore.CollectionReference;
export declare type FieryData = {
    [prop: string]: any;
};
export declare type FieryMap = {
    [key: string]: FieryData;
};
export declare type FieryTarget = FieryData[] | FieryData | FieryMap;
export declare type FieryExclusions = {
    [field: string]: boolean;
};
export declare type FierySource = Query | DocumentReference | CollectionReference;
export declare type FierySources = {
    [name: string]: FierySource;
};
export declare type FieryEntryMap = {
    [key: string]: FieryEntry;
};
export declare type FieryChanges = {
    changed: boolean;
    remote: FieryData;
    local: FieryData;
};
export declare type FieryEquality = (a: any, b: any) => boolean;
export declare type FieryMergeStrategy = (a: any, b: any) => any;
export declare type FieryMergeStrategies = {
    [option: string]: FieryMergeStrategy;
};
export declare type FieryOptionsMap = {
    [name: string]: Partial<FieryOptions>;
};
export declare type FieryOptionsInput = string | Partial<FieryOptions>;
export declare type FieryFields = string | string[];
export declare type FieryCache = {
    [uid: string]: FieryCacheEntry;
};
export interface FierySystem {
    removeNamed: (name: string) => any;
    setProperty: (target: any, property: string, value: any) => any;
    removeProperty: (target: any, property: string) => any;
    arraySet: (target: any[], index: number, value: any) => any;
    arrayAdd: (target: any[], value: any) => any;
    arrayResize: (target: any[], size: number) => any;
}
export interface FieryOptions {
    extends?: FieryOptionsInput;
    id: number;
    shared: boolean;
    instance?: FieryInstance;
    key?: string;
    query?: (source: CollectionReference) => Query;
    map?: boolean;
    doc?: boolean;
    ref?: boolean;
    once?: boolean;
    type?: {
        new (): FieryData;
    };
    newDocument: (encoded?: FieryData) => FieryData;
    newCollection: () => FieryMap | FieryData[];
    decode?: (encoded: FieryData) => FieryData;
    decoders?: {
        [prop: string]: (a: any, encoded: FieryData) => any;
    };
    encoders?: {
        [prop: string]: (a: any, data: FieryData) => any;
    };
    defaults: {
        [prop: string]: any | (() => any);
    };
    record?: boolean;
    recordOptions: {
        sync?: string;
        update?: string;
        remove?: string;
        ref?: string;
        clear?: string;
        build?: string;
        create?: string;
        getChanges?: string;
        [unspecified: string]: any;
    };
    exclude: FieryExclusions | string[];
    include: string[];
    parent?: FieryOptions;
    sub?: {
        [subProp: string]: FieryOptionsInput;
    };
    propValue: string;
    onceOptions?: GetOptions;
    liveOptions: QueryListenOptions | DocumentListenOptions;
    onError: (error: any) => any;
    onSuccess: (target: FieryTarget) => any;
    onMissing: () => any;
    onRemove: () => any;
}
export interface FieryInstance {
    <T extends FieryTarget>(source: FierySource, options?: FieryOptionsInput, name?: string): T;
    system: FierySystem;
    options: {
        [optionKey: number]: FieryOptions;
    };
    sources: {
        [name: string]: FierySource;
    };
    entry: FieryEntryMap;
    entryList: (FieryEntry | null)[];
    cache: FieryCache;
    destroy: () => void;
    free: (target: FieryTarget) => void;
    linkSources: (container: any) => void;
    update: (data: FieryData, fields?: FieryFields) => Promise<void>;
    sync: (data: FieryData, fields?: FieryFields) => Promise<void>;
    remove: (data: FieryData) => Promise<void>;
    clear: (data: FieryData, props: FieryFields) => Promise<void[]>;
    getChanges: (data: FieryData, fieldsOrEquality: FieryFields | FieryEquality, equalityOrNothing?: FieryEquality) => Promise<FieryChanges>;
    ref: (data: FieryData) => FierySource;
    create: <T extends FieryData>(target: string | FieryTarget, initial?: FieryData) => T;
    createSub: <T extends FieryData>(data: FieryData, sub: string, initial?: FieryData) => T;
    build: <T extends FieryData>(target: string | FieryTarget, initial?: FieryData) => T;
    buildSub: <T extends FieryData>(data: FieryData, sub: string, initial?: FieryData) => T;
}
export interface FieryMetadata {
    uid: string;
    path: string;
    storeKey: number;
    store: Firestore;
    optionKey: string;
    options: FieryOptions;
}
export declare type FieryRecordSync = (fields?: FieryFields) => Promise<void>;
export declare type FieryRecordUpdate = (fields?: FieryFields) => Promise<void>;
export declare type FieryRecordRemove = (excludeSubs: boolean) => Promise<void>;
export declare type FieryRecordRef = (sub?: string) => FierySource;
export declare type FieryRecordClear = (props: FieryFields) => Promise<void[]>;
export declare type FieryRecordCreate = <T extends FieryData>(sub: string, initial?: FieryData) => T;
export declare type FieryRecordBuild = <T extends FieryData>(sub: string, initial?: FieryData) => T;
export declare type FieryRecordChanges = (fieldsOrEquality: FieryFields | FieryEquality, equalityOrNothing?: FieryEquality) => Promise<FieryChanges>;
export interface FieryEntry {
    name?: string;
    options: FieryOptions;
    source: FierySource;
    instance: FieryInstance;
    storeKey: number;
    target?: FieryTarget;
    children: FieryCache;
    recordFunctions: {
        sync: FieryRecordSync;
        update: FieryRecordUpdate;
        remove: FieryRecordRemove;
        ref: FieryRecordRef;
        clear: FieryRecordClear;
        create: FieryRecordCreate;
        build: FieryRecordBuild;
        getChanges: FieryRecordChanges;
    };
    promise?: Promise<QuerySnapshot>;
    off?: () => any;
    id?: number;
    index?: number;
    live: boolean;
}
export interface FieryCacheEntry {
    uid: string;
    data: FieryData;
    ref: DocumentReference;
    uses: number;
    sub: FieryEntryMap;
    firstEntry: FieryEntry;
    entries: FieryEntry[];
    removed: boolean;
}
export {};