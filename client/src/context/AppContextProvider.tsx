import { createContext, PropsWithChildren, useContext, useState } from 'react';

const AppContext = createContext({
	myString: '',
	setMyString: (_value: string) => {},
});

const AppContextProvider = ({ children }: PropsWithChildren) => {
	const [myString, setMyString] = useState('initialValue');

	return (
		<AppContext.Provider value={{ myString, setMyString }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;