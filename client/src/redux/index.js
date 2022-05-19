const { createStore, combineReducers } = require('redux');
// Action Type
// Normally this is inside of a file of its own
const TERMINATE  = 'TERMINATE';
// Action creator
//This is normally inside of a file of its own.
const terminate = amount => {
	return {
		type: TERMINATE,
		payload: amount,
	};
};
//Reducer
// Each reducer would be in a file of its own as well
const initialAssassinsState = {
	assassins: 100,
};
const assassinsReducer = (state = initialAssassinsState, action) => {
	switch(action.type) {
		case TERMINATE:
			return { ...state, assassins: state.assassins - 100 };
		default:
			return state;
	}
};
// sensor reducer
const initialSensorsState = {
	sensors: 100,
};
const sensorsReducer = (state = initialSensorsState, action) => {
	switch(action.type) {
		case TERMINATE:
			return { ...state, sensors: state.sensors - action.payload };
		default:
			return state;
	}
};
// medics reducer
const initialMedicsState = {
	medics: 100,
};
const medicsReducer = (state = initialMedicsState, action) => {
	switch(action.type) {
		case TERMINATE:
			const numOfMedicsToSendOut = Math.floor(action.payload / 5);
			return { ...state, medics: state.medics - numOfMedicsToSendOut };
		default:
			return state;
	}
};
const rootReducer = combineReducers({
	ulises: assassinsReducer,
	david: sensorsReducer,
	alex: medicsReducer,
});
const hiddenTreesVillageStore = createStore(rootReducer);
console.log('Before update', hiddenTreesVillageStore.getState());
hiddenTreesVillageStore.dispatch(terminate(5));
hiddenTreesVillageStore.dispatch(terminate(5));
hiddenTreesVillageStore.dispatch(terminate(5));
hiddenTreesVillageStore.dispatch(terminate(5));
console.log('After update', hiddenTreesVillageStore.getState());
