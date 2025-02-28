import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/services/authService";
import { patientService } from "@/components/services/patientService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "POST") {
    const data = req.body;
    try {
      await patientService.createPatient(data);
      res.status(200).json({ message: "Patient created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error creating patient" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}