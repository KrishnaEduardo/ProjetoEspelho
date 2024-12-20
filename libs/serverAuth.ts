import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth"

import prisma from "@/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
        throw new Error('Não está logado.');
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });
    
    if (!currentUser) {
        throw new Error('Não está logado.');
    }
    
    return { currentUser };
};

export default serverAuth;