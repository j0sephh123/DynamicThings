import { useLocalStorage } from 'react-use';
import { createContext, PropsWithChildren, useContext } from 'react';

export const employeesTableSizeOptions = ['small', 'medium'] as const;
export const employeesLayoutOptions = ['table', 'list'] as const;

export type Settings = {
	employeesTableSize: (typeof employeesTableSizeOptions)[number];
	employeesLayout: (typeof employeesLayoutOptions)[number];
};

const defaultSettings: Settings = {
	employeesTableSize: 'small',
	employeesLayout: 'table',
};

type Ctx = {
	settings: Settings;
	setEmployeesTableSize: (
		employeesTableSize: Settings['employeesTableSize']
	) => void;
	setEmployeesEmployeesLayout: (
		employeesLayout: Settings['employeesLayout']
	) => void;
};

const LocalStorageContext = createContext<Ctx>({
	settings: defaultSettings,
	setEmployeesTableSize: (
		_employeesTableSize: Settings['employeesTableSize']
	) => {},
	setEmployeesEmployeesLayout: (
		_employeesLayout: Settings['employeesLayout']
	) => {},
});

const LocalStorageContextProvider = ({ children }: PropsWithChildren) => {
	const [settings, setSettings] = useLocalStorage('settings', defaultSettings);

	const setEmployeesTableSize = (
		employeesTableSize: Settings['employeesTableSize']
	) => {
		if (settings) {
			setSettings({
				...settings,
				employeesTableSize,
			});
		}
	};

	const setEmployeesEmployeesLayout = (
		employeesLayout: Settings['employeesLayout']
	) => {
		if (settings) {
			setSettings({
				...settings,
				employeesLayout,
			});
		}
	};

	return (
		<LocalStorageContext.Provider
			value={{
				settings: settings ?? defaultSettings,
				setEmployeesTableSize,
				setEmployeesEmployeesLayout,
			}}
		>
			{children}
		</LocalStorageContext.Provider>
	);
};

export const useLocalStorageContext = () => useContext(LocalStorageContext);

export default LocalStorageContextProvider;
