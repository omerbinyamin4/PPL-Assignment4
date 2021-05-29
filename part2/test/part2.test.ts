// noinspection DuplicatedCode

import chai, { expect } from 'chai';

import { asycMemo,/* asyncWaterfallWithRetry, getAll, lazyFilter, lazyMap,*/ makePromisedStore, MISSING_KEY } from '../src/part2';

import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)

// describe('2.1 (PromisedStore)', () => {
//     it('stores and retrieves value', async () => {
//         const store = makePromisedStore()
//         await store.set('a', 42)
//         const a = await store.get('a')
//         expect(a).to.equal(42)
//     })

//     it('throws on missing key', async () => {
//         const store = makePromisedStore()
//         await expect(store.get('a')).to.be.rejectedWith(MISSING_KEY)
//     })

//     it('getAll retrieves an array', async () => {
//         const store = makePromisedStore()
//         await store.set('a', 42)
//         await store.set('b', 24)
//         expect(await getAll(store,['a', 'b'])).to.deep.equal([42, 24])
//         expect(await getAll(store,['b', 'a'])).to.deep.equal([24, 42])
//     })
// })

describe('2.2 (asycMemo)', () => {
    it('memoizes calls', async () => {
        let ret = 'cached'
        const memo = asycMemo((x) => ret)

        expect(await memo('a')).to.equal('cached')
        ret = 'new'
        expect(await memo('a')).to.equal('cached')
    })
})

// 