import { PropsWithChildren } from 'react';
import { ModalStateContext } from './ModalContext';
import useModalContextHooks from './useModalContextHooks';

const ModalContextProvider = ({ children }: PropsWithChildren) => {
	const value = useModalContextHooks();

	return (
		<ModalStateContext.Provider value={value}>
			{children}
		</ModalStateContext.Provider>
	);
};

export default ModalContextProvider;
