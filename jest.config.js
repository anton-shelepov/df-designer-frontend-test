module.exports = {
    setupFilesAfterEnv: ["./jest.setup.ts"],
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    extensionsToTreatAsEsm: [".ts", ".tsx"],
    globals: {
        "ts-jest": {
            useESM: true,
        },
    },
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
};
