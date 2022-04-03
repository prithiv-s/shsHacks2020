export default interface UserModel {
	rules: string[];
	ruleNames: string[];
	lists: { [name: string]: { [word: string]: string } };
}
