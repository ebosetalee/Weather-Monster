export default {
	verbose: true,
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.js?$",
	testEnvironment: "jest-environment-node",
    moduleFileExtensions: ["js"],
	moduleDirectories: ["node_modules", "lib"],
	transform: {}
};
