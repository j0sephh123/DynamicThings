export default function shallowCompare(
	obj1: Record<string, any>,
	obj2: Record<string, any>
): boolean {
	// Check if both objects have the same number of keys
	const obj1Keys = Object.keys(obj1);
	const obj2Keys = Object.keys(obj2);

	if (obj1Keys.length !== obj2Keys.length) {
		return false;
	}

	// Check if all keys and values are the same
	for (const key of obj1Keys) {
		if (obj1[key] !== obj2[key]) {
			return false;
		}
	}

	return true;
}
