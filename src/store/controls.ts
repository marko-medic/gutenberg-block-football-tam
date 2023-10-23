import { TShirtData } from "./../types/index";
import axios from "axios";
import { TSHIRT_TYPES } from "./types";

const BASE_URL = "http://localhost:3000/items";

export const populateTshirts = () => ({
	type: TSHIRT_TYPES.POPULATE_TSHIRTS,
});

export const updateTshirts = (payload: TShirtData[]) => ({
	type: TSHIRT_TYPES.UPDATE_TSHIRTS,
	payload,
});

export const addTshirt = (payload: TShirtData) => ({
	type: TSHIRT_TYPES.ADD_TSHIRT,
	payload,
});

export const removeTshirt = (payload: TShirtData["id"]) => ({
	type: TSHIRT_TYPES.REMOVE_TSHIRT,
	payload,
});

export default {
	async [TSHIRT_TYPES.POPULATE_TSHIRTS]() {
		const resp = await axios.get(BASE_URL);
		return resp?.data;
	},
	async [TSHIRT_TYPES.UPDATE_TSHIRTS](data: {
		type: string;
		payload: TShirtData[];
	}) {
		data.payload.forEach(async (item) => {
			await axios.put(`${BASE_URL}/${item.id}`, item);
		});
		return data.payload;
	},
	async [TSHIRT_TYPES.ADD_TSHIRT](data: { type: string; payload: TShirtData }) {
		const resp = await axios.post(BASE_URL, data.payload);
		return resp.data;
	},

	// not used...
	async [TSHIRT_TYPES.REMOVE_TSHIRT](data: {
		type: string;
		payload: TShirtData["id"];
	}) {
		const resp = await axios.delete(`${BASE_URL}/${data.payload}`);
		return resp.data;
	},
};