import * as React from 'react';

function useTypedState<T>(initialValue: T) {
	const [selectedOption, setSelectedOption] =
		React.useState<T>(initialValue);
	return [selectedOption, setSelectedOption] as const;
}

export default useTypedState;
