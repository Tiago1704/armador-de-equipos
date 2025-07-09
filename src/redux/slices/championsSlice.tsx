import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Champion {
    id: string;
    key: string;
    name: string;
    title: string;
    // podés agregar más campos si querés
}

interface ChampionsState {
    champions: Champion[];
    status: "idle" | "loading" | "succeeded" | "failed"; // ← AÑADIDO "succeeded"
}

const initialState: ChampionsState = {
    champions: [],
    status: "idle",
};

// async thunk para cargar los campeones
export const fetchChampions = createAsyncThunk(
    "champions/fetchChampions",
    async () => {
        const version = "13.16.1";
        const response = await axios.get(
            `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
        );
        const champsData = response.data.data;
        return Object.values(champsData) as Champion[];
    }
);

export const championsSlice = createSlice({
    name: "champions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChampions.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchChampions.fulfilled, (state, action) => {
                const newData = action.payload;
                const currentData = state.champions;

                const sameLength = currentData.length === newData.length;
                const sameContent =
                    sameLength &&
                    currentData.every((champ, i) => champ.id === newData[i].id);

                if (!sameContent) {
                    state.champions = newData;
                }

                state.status = "succeeded"; // ← CAMBIADO de "idle" a "succeeded"
            })
            .addCase(fetchChampions.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default championsSlice.reducer;