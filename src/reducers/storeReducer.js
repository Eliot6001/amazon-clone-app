import { ADD_ITEM, GET_ITEMS, REMOVE_ITEM, EMPTY_CART } from '../constants';
const initialState = {
	items: [],

};

export default function appReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_ITEM:
			const length = state.items.length;
			console.log(state);
			if (length === 0) {
				return {
					...state,
					items: [
						...state.items,
						{
							...action.payload,
							count: 1,
						},
					],
				};
			} else
				for (let i = 0; i < length; i++){
					if (state.items[i].id === action.payload.id) {
						state.items[i].count += 1;
						return {
							...state,
							items: [...state.items],
						};
					}
				}
			return {
				...state,
				items: [
					...state.items,
					{
						...action.payload,
						count: 1,
					},
				],
			};
		case REMOVE_ITEM:
			const id = action.payload.id;
			const count = action.payload.count;
			const StateCopy = [...state.items];
			
			if (count === 1) {
				return {
					...state,
					items: [...state.items].filter((item) => item.id !== id),
				};
			}
			const newState = StateCopy.find((item) => item.id === id);
			const index = StateCopy.findIndex((elem) => elem.id === newState.id);
			newState.count -= 1;
			const copyState = [...state.items];
			copyState[index] = newState
			console.log('this is newState', copyState);
			
			return {
				...state,
				items:
					copyState,
			};
		case EMPTY_CART:
			return {
				...state,
				items: []
			}	
		default:
			return state;
	}
}
