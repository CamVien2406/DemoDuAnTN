// import { configureStore } from '@reduxjs/toolkit'
// import Slides from './silces/Silces';
// import HomeScreenSlice from './silces/HomeScreenSlice';
// const store = configureStore({
//     reducer: {
//         SlicesReducer: Slides,
//         HomeScreenSlice: HomeScreenSlice.reducer,
//     }
// })
// export default store;
import { configureStore } from '@reduxjs/toolkit';
import Slides from './silces/Silces';
import HomeScreenSlice from './silces/HomeScreenSlice';

const store = configureStore({
    reducer: {
        SlicesReducer: Slides,
        HomeScreenSlice: HomeScreenSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                warnAfter: 100, // Increase warning threshold to 100ms
            },
        }),
});

export default store;
