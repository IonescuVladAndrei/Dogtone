import { createContext, useContext, useReducer, useRef } from "react";
import { AppActionType as AAT } from "./appContextEnum";
import { ImageOriginType } from "./imageOriginEnum";
import { FiltersType } from "../filter-list/filtersEnum";

const AppContext = createContext();

const initialState = {
	imageOrigin: ImageOriginType.RANDOM,
	isOrigImgValid: false,
	isOrigImgLoading: false,
	dogBreed: null,
	filter: FiltersType.AVERAGE_GREYSCALE,
	filterVal: 0,
};

function reducer(state, action) {
	switch (action.type) {
		case AAT.IMAGEORIGIN_UPDATED: {
			return { ...state, imageOrigin: action.payload, isOrigImgValid: false };
		}
		case AAT.DOGBREED_UPDATED: {
			return { ...state, dogBreed: action.payload };
		}
		case AAT.IS_ORIG_IMG_VALID_UPDATED: {
			return { ...state, isOrigImgValid: action.payload };
		}
		case AAT.IS_ORIG_IMG_LOADING_UPDATED: {
			return { ...state, isOrigImgLoading: action.payload };
		}
		case AAT.FILTER_UPDATED: {
			const { filter, filterVal } = action.payload;

			if (filterVal !== undefined) return { ...state, filter: filter, filterVal: filterVal };

			return { ...state, filter: filter };
		}
		case AAT.FILTER_VAL_UPDATED: {
			return { ...state, filterVal: action.payload };
		}
		default:
			throw new Error("Unkown action type!");
	}
}

function AppProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const origImgRef = useRef(null);
	const { imageOrigin, dogBreed, isOrigImgValid, isOrigImgLoading, filter, filterVal } = state;

	function setImageOrigin(imageOrigin) {
		dispatch({ type: AAT.IMAGEORIGIN_UPDATED, payload: imageOrigin });
	}

	function setDogBreed(dogBreed) {
		dispatch({ type: AAT.DOGBREED_UPDATED, payload: dogBreed });
	}

	function setIsOrigImgValid(isOrigImgValid) {
		dispatch({ type: AAT.IS_ORIG_IMG_VALID_UPDATED, payload: isOrigImgValid });
	}

	function setIsOrigImgLoading(isOrigImgLoading) {
		dispatch({ type: AAT.IS_ORIG_IMG_LOADING_UPDATED, payload: isOrigImgLoading });
	}

	function setFilter(filter, filterVal) {
		dispatch({ type: AAT.FILTER_UPDATED, payload: { filter, filterVal } });
	}

	function setFilterVal(filterVal) {
		dispatch({ type: AAT.FILTER_VAL_UPDATED, payload: filterVal });
	}

	return (
		<AppContext.Provider
			value={{
				imageOrigin,
				dogBreed,
				isOrigImgValid,
				isOrigImgLoading,
				filter,
				filterVal,
				origImgRef,
				setImageOrigin,
				setDogBreed,
				setIsOrigImgValid,
				setIsOrigImgLoading,
				setFilter,
				setFilterVal,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

function useAppEdit() {
	const context = useContext(AppContext);
	if (context === undefined) throw new Error("AppContext was used outside of the AppProvider");

	return context;
}

export { AppProvider, useAppEdit };
