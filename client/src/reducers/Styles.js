import { Map } from "immutable";

const initial = Map({
  header: Map({
    backgroundColor: "#2793e8"
  }),
  title: Map({
    color: "white"
  }),
  body: Map({
    backgroundColor: "#f1f1f1"
  }),
  text: Map({
    color: "black",
    fontSize: 14
  }),
  card: Map({
    backgroundColor: "#ffffff"
  })
});

const reducer = (state = initial, { type, payload }) => {
  switch (type) {
    default: {
      return state;
    }
  }
};

export default reducer;
