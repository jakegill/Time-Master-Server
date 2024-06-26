import type { Request, Response } from "express";
import { getProject } from "../../services/projects/getProject";

// Get a single project for a user to clock in/out of.

const getProjectController = async (req: Request, res: Response) => {
	const tenantName = req.tenantName;
	const projectId = req.params.projectId;

	if (!(req.role === "employee" || req.role === "admin" || req.role === "manager")) {
		res.status(403).send("Unauthorized");
		return;
	}

	try {
		const project = await getProject(tenantName, projectId);
		res.json({ status: 201, project });
	} catch (error) {
		res.json({ status: 500, message: error });
	}
};

export { getProjectController };