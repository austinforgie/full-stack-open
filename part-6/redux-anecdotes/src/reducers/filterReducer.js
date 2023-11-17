const filterReducer = (state = null, { type, payload }) => {
  switch (type) {
    case "FILTER_CHANGE": {
      return payload;
    }

    default:
      return state;
  }
};

export const filterChange = (query) => ({
  type: "FILTER_CHANGE",
  payload: query,
});

export default filterReducer;
