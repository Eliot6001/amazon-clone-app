import { ADD_ITEM, REMOVE_ITEM, EMPTY_CART } from '../constants/index';

export const addItem = (item) => {
    return {
			type: ADD_ITEM,
			payload: item,
		};
};
export const removeItem = (item) => {
	return {
		type: REMOVE_ITEM,
		payload: {
			id: item.id,
			count: item.count
		}
	};
};
export const emptycart = () => {
	return {
		type: EMPTY_CART,
	};
}