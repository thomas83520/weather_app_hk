import { createContext, useReducer } from "react";
import { initialWidgetsAvailable } from "../constant";

export const WidgetListContext = createContext();

export const widgetReducer = (state, action) => {
  switch (action.type) {
    case "ADD_WIDGET":
      return {
        ...state,
        widgets: action.payload.widgets,
        widgetsAvailable: action.payload.widgetsAvailable,
      };

    case "DELETE_WIDGET":
      return {
        ...state,
        widgets: action.payload.widgets,
        widgetsAvailable: action.payload.widgetsAvailable,
      };

    default:
      return state;
  }
};

export const WidgetListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(widgetReducer, {
    widgets: [],
    widgetsAvailable: initialWidgetsAvailable,
  });

  return (
    <WidgetListContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WidgetListContext.Provider>
  );
};
