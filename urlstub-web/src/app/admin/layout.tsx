import {SessionProvider} from "next-auth/react";
import {auth} from "@/auth";


export default async function Layout({
                                         children,
                                     }: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth()

    if (!session?.user) {

    }

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}