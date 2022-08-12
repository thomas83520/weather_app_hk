import { createContext, useReducer } from "react";

export const WidgetListContext = createContext();

export const widgetReducer = (state, action) => {
  switch (action.type) {
    case "ADD_WIDGET":
      return { ...state, widgets: action.payload };

    case "DELETE_WIDGET":
      return { ...state, widgets: action.payload };

    default:
      return state;
  }
};

export const WidgetListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(widgetReducer, {
    widgets:[]
  });

  return (
    <WidgetListContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WidgetListContext.Provider>
  );
};
