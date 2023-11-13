import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  describe("should return initial state", () => {
    test("when called with undefined state", () => {
      const action = {
        type: "DO_NOTHING",
      };

      const newState = counterReducer(undefined, action);
      expect(newState).toEqual(initialState);
    });

    test("when called with action 'ZERO'", () => {
      const action = {
        type: "ZERO",
      };
      const state = {
        good: 12,
        ok: 32,
        bad: 5,
      };

      deepFreeze(state);
      const newState = counterReducer(state, action);
      expect(newState).toEqual(initialState);
    });
  });

  describe("should return incremented state", () => {
    const state = initialState;
    deepFreeze(state);

    test("good with action 'GOOD'", () => {
      const action = {
        type: "GOOD",
      };

      const newState = counterReducer(state, action);
      expect(newState).toEqual({
        good: 1,
        ok: 0,
        bad: 0,
      });
    });

    test("ok with action 'OK'", () => {
      const action = {
        type: "OK",
      };

      const newState = counterReducer(state, action);
      expect(newState).toEqual({
        good: 0,
        ok: 1,
        bad: 0,
      });
    });

    test("bad with action 'BAD'", () => {
      const action = {
        type: "BAD",
      };

      const newState = counterReducer(state, action);
      expect(newState).toEqual({
        good: 0,
        ok: 0,
        bad: 1,
      });
    });
  });
});
