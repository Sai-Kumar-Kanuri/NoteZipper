import { applyMiddleware, combineReducers } from "redux";
import { legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const reducer = combineReducers({

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
})

const userInformationStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: { userInfo: userInformationStorage }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)
    )
);

export default store;