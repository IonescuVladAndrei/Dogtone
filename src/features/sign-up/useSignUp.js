import { useQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { queryKey_user } from "../../constants/user-query-key";
import { signUpApi } from "../../services/apiUser";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
	const signUpArgsRef = useRef(null);
	const navigate = useNavigate();

	const { isFetching, refetch } = useQuery({
		queryKey: [queryKey_user],
		queryFn: () => signUpApi(signUpArgsRef.current),
		enabled: false,
		retry: false,
		gcTime: Infinity,
	});

	const signup = useCallback(
		async (values) => {
			signUpArgsRef.current = values;
			try {
				await refetch({ throwOnError: true });

				navigate("/homepage", { replace: true });
			} catch (e) {
				toast.error(e.message);
			}
		},
		[refetch, navigate]
	);

	return { signup, isFetching };
}
