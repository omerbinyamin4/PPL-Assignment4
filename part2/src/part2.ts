/* 2.1 */

export const MISSING_KEY = '___MISSING___'

type PromisedStore<K, V> = {
    get(key: K): Promise<V>,
    set(key: K, value: V): Promise<void>,
    delete(key: K): Promise<void>
}


export function makePromisedStore<K, V>(): PromisedStore<K, V> {
    let store: Map<K, V> = new Map();
    return {
        get(key: K) {
            return new Promise<V>((resolve, reject) => {
                const value = store.get(key);
                if (value === undefined) reject(MISSING_KEY);
                else resolve(value);
            });
        },
        set(key: K, value: V) {
            return new Promise<void>((resolve, reject) => {
                store.set(key, value);
                resolve();
            });
        },
        delete(key: K) {
            return new Promise<void>((resolve, reject) => {
                if (store.has(key)) {
                    store.delete(key);
                    resolve();
                }
                else reject(MISSING_KEY);
            });
        },
    }
}

export function getAll<K, V>(store: PromisedStore<K, V>, keys: K[]): Promise<V[]> | Promise<string> {
    const p : Promise<V>[]  = keys.map(value => store.get(value));
    return Promise.all(p);
}

/* 2.2 */
export function asycMemo<T, R>(f: (param: T) => R): (param: T) => Promise<R> {
    const store = makePromisedStore<T, R>();
    return async (param : T) : Promise<R> => {
        try {
            return await store.get(param);
        }
        catch (e) {
            await store.set(param, f(param))
        }
        return await store.get(param);
    }
}

/* 2.3 */
function* createFGen<T>(generator: Generator<T>,  filterFn: (param: T) => boolean) : Generator<T> {
    let current = generator.next();
    while (!current.done) {
        if (filterFn(current.value))
            yield current.value
        current = generator.next();
    }
}

export function lazyFilter<T>(genFn: () => Generator<T>, filterFn: (param: T) => boolean): () => Generator<T> {
    return () : Generator<T> => createFGen(genFn(), filterFn);
}

function* createMGen<T, R>(generator: Generator<T>,  mapFn: (param: T) => R) : Generator<R> {
    let current = generator.next();
    while (!current.done) {
        yield mapFn(current.value);
        current = generator.next();
    }
}

export function lazyMap<T, R>(genFn: () => Generator<T>, mapFn: (param: T) => R): () => Generator<R> {
    return () : Generator<R> => createMGen(genFn(), mapFn);
}

/* 2.4 */
export async function asyncWaterfallWithRetry(fns: [() => Promise<any>, ...((param:any) => any)[]]): Promise<any> {
    
}