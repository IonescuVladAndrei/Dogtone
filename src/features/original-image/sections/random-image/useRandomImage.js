import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { fetchDogImageApi, fetchDogImageByBreedApi } from "../../../../services/apiDog";

export const queryKey_randomImage = "random-image";

function useRandomImage(breed = null) {
	const lastSuccessRef = useRef(0);
	const lastErrorRef = useRef(0);

	const { data, isFetching, isError, isSuccess, refetch, dataUpdatedAt, errorUpdatedAt } = useQuery({
		queryKey: [queryKey_randomImage],
		queryFn: breed ? () => fetchDogImageByBreedApi(breed) : () => fetchDogImageApi(),
		enabled: false,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (isSuccess && dataUpdatedAt > 0 && dataUpdatedAt !== lastSuccessRef.current) {
			toast.success("Successfully fetched image link");
			lastSuccessRef.current = dataUpdatedAt;
		}
	}, [isSuccess, dataUpdatedAt]);

	useEffect(() => {
		if (isError && errorUpdatedAt > 0 && errorUpdatedAt !== lastErrorRef.current) {
			toast.error("Failed to fetch image link");
			lastErrorRef.current = errorUpdatedAt;
		}
	}, [isError, errorUpdatedAt]);

	return { isFetching, data, refetch, isError };
}

export default useRandomImage;
