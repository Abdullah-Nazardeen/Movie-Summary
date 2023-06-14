import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === "GET") {
    const movies = await prisma.Movie.findMany()
    res.json(movies)
  } else if (req.method === "POST") {
    const { title, id, type, year, director, actors, image, summary} = req.body
    const newMovie = await prisma.Movie.create({
      data: {
        title,
        id,
        type,
        year,
        director,
        actors,
        image,
        summary
      }
    })
    res.status(200).send(newMovie)
  } else {
    res.status(405).json({error: "method not accepted"})
  }
  
}
