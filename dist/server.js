"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const userRelations = yield prisma.testUser.findFirst({
            where: {
                writtenPosts: {
                    every: {
                        createdAt: new Date(),
                        title: "Test"
                    }
                }
            }
        });
        const user = yield prisma.testUser.findMany({
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
            skip: 1,
            take: 2,
            distinct: ["name"] // if there are more users with same name I get the one
        });
        const userCombination = yield prisma.testUser.findUnique({
            where: {
                age_name: {
                    name: "test@prisma.com",
                    age: 12
                }
            }
        });
        console.log(user);
    });
}
main();
