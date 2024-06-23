import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGOUT,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
} from "../actions/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
  error: null,
  email: localStorage.getItem("email"),
  message: null,
  id: localStorage.getItem("id"),
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("id", payload.id);
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        error: "OK",
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };
    case LOGOUT:
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        error: payload,
      };
    case PASSWORD_RESET_FAIL:
      return {
        ...state,
        error: payload,
      };
    case PASSWORD_RESET_SUCCESS:
      localStorage.setItem("email", payload);
      {
        return {
          ...state,
          email: payload,
        };
      }
    case PASSWORD_RESET_CONFIRM_SUCCESS:
      return {
        ...state,
        message: payload,
      };
    case PASSWORD_RESET_CONFIRM_FAIL:
      return {
        ...state,
      };
    case ACTIVATION_SUCCESS:
      return {
        ...state,
        message: payload,
      };
    case ACTIVATION_FAIL:
      return {
        ...state,
        error: payload,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        message: payload,
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
