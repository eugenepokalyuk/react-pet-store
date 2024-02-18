import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import rootReducer from "./store/reducers";

type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;