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
            });
        },
        delete(key: K) {
            return new Promise<void>((resolve, reject) => {
                if (store.has(key)) store.delete(key);
                else reject(MISSING_KEY);
            });
        },
    }
}

// export function getAll<K, V>(store: PromisedStore<K, V>, keys: K[]): Promise<V[] | string> {
//      const p = store.get(keys[0]);
//      p.then((value) => [value])

//     });
// }


/* 2.2 */

//??? (you may want to add helper functions here)

export function asycMemo<T, R>(f: (param: T) => R): (param: T) => Promise<R> {
    const store = makePromisedStore<T, R>();
    return  (param: T): Promise<R> => {
        const p = store.get(param);
        p.then((value) => value);
        p.catch((param) => {
            const returnValue = f(param);
            store.set(param, returnValue);
            return returnValue;
        });
        return p;
    } 
}


/* 2.3 */

// export function lazyFilter<T>(genFn: () => Generator<T>, filterFn: ???): ??? {
//     ???
// }

// export function lazyMap<T, R>(genFn: () => Generator<T>, mapFn: ???): ??? {
//     ???
// }

/* 2.4 */
// you can use 'any' in this question

// export async function asyncWaterfallWithRetry(fns: [() => Promise<any>, ...(???)[]]): Promise<any> {
//     ???
// }