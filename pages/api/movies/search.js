import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if(req.method === "GET") {
    const { s } = req.query 
    const movie = await prisma.Movie.findMany({ 
      where: { 
        title: {
          contains: s.toLowerCase()
        },
      },
    });
    res.json(movie);
  } else {
    res.status(500).json({ error: 'An error occurred' });
  }
}




