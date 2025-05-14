import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { fetchAllDogBreedsApi } from "../../../../../services/apiDog";

const queryKey = "dog-breeds";

function useDogBreeds() {
	const lastSuccessRef = useRef(0);
	const lastErrorRef = useRef(0);

	const { data, isError, isSuccess, isFetching, errorUpdatedAt, dataUpdatedAt } = useQuery({
		queryKey: [queryKey],
		queryFn: fetchAllDogBreedsApi,
		refetchOnWindowFocus: false,
		retry: 3,
	});

	useEffect(() => {
		if (isSuccess && dataUpdatedAt > 0 && dataUpdatedAt !== lastSuccessRef.current) {
			toast.success("Successfully fetched breed list");
			lastSuccessRef.current = dataUpdatedAt;
		}
	}, [isSuccess, dataUpdatedAt]);

	useEffect(() => {
		if (isError && errorUpdatedAt > 0 && errorUpdatedAt !== lastErrorRef.current) {
			toast.error("Failed to fetch image link");
			lastErrorRef.current = errorUpdatedAt;
		}
	}, [isError, errorUpdatedAt]);

	return { data, isFetching, isError };
}

export default useDogBreeds;
