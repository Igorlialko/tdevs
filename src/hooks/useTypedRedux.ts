import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

import {AppDispatch, TypeRootState} from "../store/store";

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector;