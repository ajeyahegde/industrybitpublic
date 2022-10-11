import React, { createContext, useReducer, useContext } from 'react';
import { createPortal } from 'react-dom'
import Toast from '../components/Toast';

export const ToastContext = createContext()

const initialState = []

export const ADD = 'ADD'
export const REMOVE = 'REMOVE'
export const REMOVE_ALL = 'REMOVE_ALL'

export const toastReducer = (state, action) => {
    switch (action.type) {
        case ADD:
            return [
                ...state,
                {
                    id: +new Date(),
                    content: action.payload,
                }
            ];
        case REMOVE:
            return state.filter(t => t.id !== action.payload.id)
        case REMOVE_ALL:
            return initialState
        default:
            return state
    }
};

export const ToastProvider = props => {
    const [toast, toastDispatch] = useReducer(toastReducer, initialState);
    
    const sendToast = (message, severity="success") => {
        toastDispatch({
            type: ADD,
            payload: {
                severity: severity, message: message
            }
        })
    }

    const removeToast = (id) => {
        toastDispatch({ type: REMOVE, payload: { id: id } })
    }

    const removeAllToast = () => {
        toastDispatch({
            type: REMOVE_ALL,
        })
    }

    const toastData = { toast, toastDispatch, sendToast, removeToast, removeAllToast };
    
    return (
        <ToastContext.Provider value={toastData}>
            {props.children}
            {createPortal(<Toast toast={toast} />, document.body)}
        </ToastContext.Provider>
    );
};

export const useToastContext = () => {
    return useContext(ToastContext);
};