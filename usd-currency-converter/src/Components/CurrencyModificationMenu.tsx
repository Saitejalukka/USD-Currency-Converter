import React from "react";
import { useEffect, useState } from "react";
import bgImage from "../assets/global-virtual-currency-sign-techno-concept-background-design_1017-52482.jpg";
import makeApiCallToGetData from "../App";

export interface ResponseType {
	date: string;
	usd: Record<string, number>;
}
interface MainState {
	amountEntered: number;
	convertTo: string;
	result: number | null;
}
export const App: React.FC = () => {
	const [mainState, setMainState] = useState<MainState>({
		amountEntered: 0,
		convertTo: "",
		result: null,
	});
	const [apiResponse, setApiResponse] = useState<ResponseType>({
		date: "",
		usd: {},
	});

	useEffect(() => {
		const fetchData = async () => {
			const response = await makeApiCallToGetData();
			setApiResponse(response);
		};
		fetchData();
	}, []);

	const handleOnClick = () => {
		const { amountEntered, convertTo } = mainState;
		if (!amountEntered || !convertTo) return;

		const rate = apiResponse.usd[convertTo.toLowerCase()];
		if (rate) {
			const result = amountEntered * rate;
			setMainState((prev) => ({
				...prev,
				result: parseFloat(result.toFixed(4)), // rounding for display
			}));
		}
	};
	useEffect(() => {
		setApiResponse((prev) => prev);
	}, []);

	return (
		<div
			className="p-4 bg-cover bg-center w-[100vw] h-[100vh]"
			style={{ backgroundImage: `url(${bgImage})` }}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 h-full">
				{/* Left Welcome Panel */}
				<div className="w-full flex justify-center items-center h-full border-r border-white">
					<h2 className="font-medium text-white text-[65px] animate-bounce">
						Welcome
					</h2>
				</div>
				{/* Right Converter Panel */}
				<div className="w-full h-full flex justify-center items-center">
					<div className="w-[450px] h-[500px] bg-white rounded-2xl shadow-2xl p-5">
						<p className="text-center text-black text-lg font-semibold mb-2">
							USD Converter
						</p>
						<hr className="mb-4 border-blue-300" />

						<div className="space-y-4">
							{/* Amount Input */}
							<div className="flex flex-col">
								<label htmlFor="amount_usd" className="text-sm text-black mb-1">
									Enter USD amount:
								</label>
								<div className="relative">
									<span className="absolute left-1 top-1/2 -translate-y-1/2 gap-5 text-black-500">
										$
									</span>
									<input
										id="amount_usd"
										type="number"
										className="w-full py-2 px-4 ring-1 ring-gray-600 rounded"
										value={mainState.amountEntered}
										onChange={(e) =>
											setMainState((prev) => ({
												...prev,
												amountEntered: Number(e.target.value),
											}))
										}
									/>
								</div>
							</div>

							{/* Currency Selector */}
							<div className="flex flex-col">
								<label
									htmlFor="select-country"
									className="text-sm text-black mb-1"
								>
									Select Currency:
								</label>
								<select
									id="select-country"
									className="w-full py-2 px-4 ring-1 ring-gray-600 rounded"
									value={mainState.convertTo}
									onChange={(e) =>
										setMainState((prev) => ({
											...prev,
											convertTo: e.target.value,
										}))
									}
								>
									<option value="" disabled>
										-- Choose Currency --
									</option>
									{Object.keys(apiResponse.usd).map((currencyCode) => (
										<option key={currencyCode} value={currencyCode}>
											{currencyCode.toUpperCase()}
										</option>
									))}
								</select>
							</div>

							{/* Convert Button */}
							<div className="w-full">
								<button
									className="w-full py-2 text-white bg-blue-700 rounded hover:bg-blue-800"
									onClick={handleOnClick}
								>
									Convert
								</button>
							</div>

							{/* Result */}
							<p className="text-black font-medium">Result:</p>
							<div className="w-full h-[150px] rounded bg-white flex flex-col justify-start items-center ring-1 ring-blue-400 p-3">
								<p className="text-center text-black mb-2">
									Date : {new Date().toISOString().split("T")?.[0]}
								</p>
								<div className="text-green-900 text-[40px] font-bold text-center">
									{mainState.result !== null
										? `${mainState.result} ${mainState.convertTo.toUpperCase()}`
										: "—"}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
