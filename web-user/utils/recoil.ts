import { atom, AtomEffect } from 'recoil'

const store = typeof window !== 'undefined' ? window.localStorage : null
export const localStorageEffect: (key: string) => AtomEffect<any> =
  (key) =>
  ({ setSelf, onSet }) => {
    try {
      if (store) {
        const savedValue = store.getItem(key)
        if (savedValue != null) {
          setSelf(JSON.parse(savedValue))
        }

        onSet((newValue, _, isReset) => {
          isReset ? store.removeItem(key) : store.setItem(key, JSON.stringify(newValue))
        })
      }
    } catch (e) {
      if (store) {
        store.removeItem(key)
      }
      console.log(e)
    }
  }

export const cartState = atom({
  key: 'CART_STATE', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
  effects: [localStorageEffect('CART_STATE')],
})
