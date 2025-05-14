import { useQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { queryKey_user } from "../../constants/user-query-key";
import { logInApi } from "../../services/apiUser";

export function useLogIn() {
	const logInArgsRef = useRef(null);
	const navigate = useNavigate();

	const { isFetching, refetch } = useQuery({
		queryKey: [queryKey_user],
		queryFn: () => logInApi(logInArgsRef.current),
		enabled: false,
		retry: false,
		gcTime: Infinity,
	});

	const login = useCallback(
		async (values) => {
			logInArgsRef.current = values;
			try {
				await refetch({ throwOnError: true });

				navigate("/homepage", { replace: true });
			} catch (e) {
				toast.error(e.message);
			}
		},
		[refetch, navigate]
	);

	return { login, isFetching };
}
