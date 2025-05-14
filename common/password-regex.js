export const PASSWORD_REGEXP = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=(?:.*[~^!@#$%^&*()_+={}[\]|:;"'<>,.?/`\\-]){3,}).{10,96}$/;

export const PASSWORD_REGEXP_ARR = [
	{ req: "At least one uppercase character(no accented characters): A-Z", reg: /[A-Z]/ },
	{ req: "At least one lower character(no accented characters): a-z", reg: /[a-z]/ },
	{ req: "At least one number", reg: /[0-9]/ },
	{
		req: "At least 3 special characters: ~^!@#$%^&*()_+={}[]|:;\"'<>,.?/`-\\",
		reg: /[~^!@#$%^&*()_+={}\[\]|:;"'<>,.?/`\-\\]\S*[~^!@#$%^&*()_+={}\[\]|:;"'<>,.?/`\-\\]\S*[~^!@#$%^&*()_+={}\[\]|:;"'<>,.?/`\-\\]/,
	},
	{ req: "Between 10 and 96 characters", reg: /\S{10,96}/ },
];

export const MAX_PASSWORD_LEN = 96;
