import { PropsWithChildren } from 'react';
import {
	AppStateContext
} from './AppContext';
import useAppContextHooks from './useAppContextHooks';

const AppContextProvider = ({ children }: PropsWithChildren) => {
	const state = useAppContextHooks();

	return (
		<AppStateContext.Provider value={state}>
			{children}
		</AppStateContext.Provider>
	);
};

export default AppContextProvider;
