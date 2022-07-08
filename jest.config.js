/**Arquivo de configuração do jest */
module.exports = {
  testPathIgnorePatterns: [
    "/node_modules",
    "/android",
    "/ios"
  ],
  preset: "jest-expo",
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components"
  ]
}