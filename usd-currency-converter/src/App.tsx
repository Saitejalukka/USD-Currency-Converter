import axios, { AxiosError } from "axios";
const makeApiCallToGetData = async (): Promise<ResponseType> => {
	try {
		const { data } = await axios.get<ResponseType>(
			"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json"
		);
		return data;
	} catch (error) {
		const axiosErrorResponse = error as AxiosError<{ message: string }>;
		throw new Error(axiosErrorResponse?.response?.data?.message || "API Error");
	}
};
<label htmlFor="amount_usd" className="text-sm text-black mb-1">
	Enter USD amount:
</label>;

export default makeApiCallToGetData;
