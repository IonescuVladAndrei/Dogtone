import { useEffect } from "react";
import Requirement from "./Requirement";

/**
 * @typedef {Object} RequirementHandler
 * @property {{ req: string, reg: RegExp }[]} requirements - Array of requirements that need to be met.
 * @property {function} setCanSubmit - Function called depending on value.
 * @property {string} value - The value that gets tested.
 */

/**
 * Documentation
 * @param {RequirementHandler} requirementHandler - {@link requirementHandler} object
 */
function RequirementHandler({ requirements, setCanSubmit, value = "" }) {
	useEffect(() => {
		let nrReqPassed = 0;
		requirements.forEach((req) => {
			if (req.reg.test(value)) nrReqPassed++;
		});

		if (nrReqPassed === requirements.length) setCanSubmit(true);
		else setCanSubmit(false);
	}, [value, requirements, setCanSubmit]);

	return (
		<>
			{requirements.map((req) => (
				<Requirement key={req.req} text={req.req} isCorrect={req.reg.test(value)} />
			))}
		</>
	);
}

export default RequirementHandler;
