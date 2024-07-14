import { useLocalStorage } from 'react-use';
import { createContext, PropsWithChildren, useContext } from 'react';

export const employeesTableSizeOptions = ['small', 'medium'] as const;

export type Settings = {
	employeesTableSize: (typeof employeesTableSizeOptions)[number];
};

const defaultSettings: Settings = {
	employeesTableSize: 'small',
};

type Ctx = {
	settings: Settings;
	setEmployeesTableSize: (
		employeesTableSize: Settings['employeesTableSize']
	) => void;
};

const LocalStorageContext = createContext<Ctx>({
	settings: defaultSettings,
	setEmployeesTableSize: (
		_employeesTableSize: Settings['employeesTableSize']
	) => {},
});

const LocalStorageContextProvider = ({ children }: PropsWithChildren) => {
	const [settings, setSettings] = useLocalStorage('settings', defaultSettings);

	const setEmployeesTableSize = (
		employeesTableSize: Settings['employeesTableSize']
	) => {
		setSettings(prevSettings => ({
			...prevSettings,
			employeesTableSize,
		}));
	};

	return (
		<LocalStorageContext.Provider
			value={{ settings: settings ?? defaultSettings, setEmployeesTableSize }}
		>
			{children}
		</LocalStorageContext.Provider>
	);
};

export const useLocalStorageContext = () => useContext(LocalStorageContext);

export default LocalStorageContextProvider;
