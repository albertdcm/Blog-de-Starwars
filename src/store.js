export const initialStore = () => {
  return {
    favorites: [],
    characters: [],
    planets: [],
    vehicles: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_characters":
      return { ...store, characters: action.payload };
    case "set_planets":
      return { ...store, planets: action.payload };
    case "set_vehicles":
      return { ...store, vehicles: action.payload };
    case "add_favorite":
      if (store.favorites.includes(action.payload)) return store;
      return { ...store, favorites: [...store.favorites, action.payload] };
    case "remove_favorite":
      return {
        ...store,
        favorites: store.favorites.filter(item => item !== action.payload)
      };
    default:
      throw new Error("Unknown action.");
  }
}