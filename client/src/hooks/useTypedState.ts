import * as React from 'react';

function useTypedState<T extends readonly string[]>(options: T) {
	const [selectedOption, setSelectedOption] = React.useState<T[number]>(
		options[0]
	);
	return [selectedOption, setSelectedOption] as const;
}

export default useTypedState;
