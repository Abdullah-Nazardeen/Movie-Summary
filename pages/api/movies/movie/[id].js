import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const movie = await prisma.Movie.findUnique({ where: { id: Number(id) } });
    res.json(movie);
  } else if (req.method === "DELETE") {
    await prisma.Movie.delete({ where: { id: Number(id) } });
    res.status(200).json({ movie: "movie has been deleted" }); 
  } else if (req.method === "PATCH") {
    const { summary } = req.body;
    const movie = await prisma.Movie.update({ where: { id: Number(id) }, data: { summary: summary } });
    res.json(movie); 
  } else {
    res.status(405).json({error: "method not accepted"})
  }
}

