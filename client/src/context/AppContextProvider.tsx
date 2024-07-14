import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useState,
} from 'react';

type Ctx = {
	currentModal: Modals | undefined;
	closeModal: () => void;
	openModal: (_value: Modals) => void;
};

const AppContext = createContext<Ctx>({
	currentModal: undefined,
	closeModal: () => {},
	openModal: (_value: Modals) => {},
});

type Modals = 'settings' | 'createEmployee';

const AppContextProvider = ({ children }: PropsWithChildren) => {
	const [currentModal, setCurrentModal] = useState<Modals>();

	const closeModal = useCallback(() => {
		console.log('closemodal');
		
		setCurrentModal(undefined);
	}, []);

	const openModal = useCallback((value: Modals) => {
		setCurrentModal(value);
	}, []);

	return (
		<AppContext.Provider value={{ currentModal, closeModal, openModal }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
