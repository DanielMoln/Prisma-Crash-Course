import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const userRelations = await prisma.testUser.findFirst({
        where: {
            writtenPosts: {
                every: {
                    createdAt: new Date()
                }
            }
        }
    })

    const user = await prisma.testUser.findMany({
        where: {
            AND: [
                {
                    age: {
                        lt: 10
                    }
                },
                {
                    email: {
                        contains: "@prisma.com",
                        endsWith: ".com"
                    }
                }
            ],
            OR: [
                {
                    age: {
                        lt: 10
                    }
                },
                {
                    email: {
                        contains: "@prisma.com",
                        endsWith: ".com"
                    }
                }
            ],
            NOT: [
                {
                    age: {
                        lt: 10
                    }
                },
                {
                    email: {
                        contains: "@prisma.com",
                        endsWith: ".com"
                    }
                }
            ],
            name: {
                not: "Adam",
                in: ["Alex", "Sally"],
                notIn: ["Bela", "Andras"],
                equals: "Sally",
                endsWith: "X"
            },
            age: {
                lt: 10
            },
            email: {
                contains: "@prisma.com",
                endsWith: ".com"
            }
        },
        orderBy: {
            age: "asc"
        },
        skip: 1, // skip the first one
        take: 2, // pagination (how many result I want)
        distinct: ["name"] // if there are more users with same name I get the one
    })
    const userCombination = await prisma.testUser.findUnique({
        where: {
            age_name: {
                name: "test@prisma.com",
                age: 12
            }
        }
    })

    console.log(user);
}

main();