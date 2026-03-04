import { prisma } from "../db/prisma";
import { Request, Response } from "express";
import { addDataService } from "../services/identity.service";

export const addData = async (req: Request, res: Response) => {
    try {
        const { email, phoneNumber } = req.body;

        if (!email && !phoneNumber) return res.status(401).json({ message: "Both email and phoneNumber are null" });;

        const result = await addDataService(email, phoneNumber);

        if (result === 1) res.status(400).json({ message: "Identical contact sent.." })

        else if (result === -1) res.status(400).json({ message: "Server error in service layer.." })

        return res.status(200).json({ contact: result })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error", error });
    }
}
