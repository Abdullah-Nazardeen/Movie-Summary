import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {id} = req.query 

    if (req.method === "DELETE") {
        await prisma.Comment.delete({where: { id : Number(id) }})
        res.status(204).json({ comment: "comment has been deleted" })
    } else {
        res.status(405).json({error: "method not accepted"})
    }

}

