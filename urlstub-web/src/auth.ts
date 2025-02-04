import NextAuth from "next-auth"
import Authentik from "next-auth/providers/authentik"
import GitHub from "next-auth/providers/github"
import Keycloak from "next-auth/providers/keycloak"
// import Credentials from "@auth/core/providers/credentials";

const providers = [] 

if (!process.env.AUTH_KEYCLOAK_ID || !process.env.AUTH_KEYCLOAK_SECRET || !process.env.AUTH_KEYCLOAK_ISSUER) {
    console.log("Keycloak configuration missing, skipping")
} else {
    providers.push(Keycloak)
}

if (!process.env.AUTH_GITHUB_ID || !process.env.AUTH_GITHUB_SECRET) {
    console.log("GitHub configuration missing, skipping")
} else {
    providers.push(GitHub)
}

if (!process.env.AUTH_AUTHENTIK_ID || !process.env.AUTH_AUTHENTIK_SECRET || !process.env.AUTH_AUTHENTIK_ISSUER) {
    console.log("Authentik configuration missing, skipping")
} else {
    providers.push(Authentik)
}

// providers.push(Credentials)

if (!providers) {
    console.error("No providers configured! Please set environment variables for auth providers.")
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: providers,
//   callbacks: {
//     authorized: async ({ auth }) => {
//         // Logged in users are authenticated, otherwise redirect to login page
//         return !!auth
//     },
//   },
})
