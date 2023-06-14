import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const {id} = req.query 

  if(req.method === "GET") {
    const comments = await prisma.Comment.findMany({ where: { movieId : Number(id) } })
    res.status(200).json(comments)
  } else if (req.method === "POST") {
    const { movieId, username, commentText, email } = req.body;
    const addComments = await prisma.Comment.create({ 
      data:{
        movieId: Number(movieId),
        username: username,
        content: commentText,
        email: email
      }
    })
    res.status(200).json(addComments)
  } else if (req.method === "DELETE") {
    await prisma.Comment.delete({where: { movieId : Number(id) }})
    res.status(204).json({ comment: "comment has been deleted" })
  } else {
    res.status(405).json({error: "method not accepted"})
  }
}

