import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#e6f2ff" },
          500: { value: "#3182ce" },
          600: { value: "#2b6cb0" },
        },
      },
    },
  },
})
