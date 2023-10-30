import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	Dispatch,
	SetStateAction,
	useMemo,
} from 'react';

// Define the type for the grid data
type GridData = {
	view: string;
};

type DashboardContextType = {
	gridData: GridData;
	setGridData: Dispatch<SetStateAction<GridData>>;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function useDashboard() {
	const context = useContext(DashboardContext);
	if (!context) {
		throw new Error('useDashboard must be used within a DashboardProvider');
	}
	return context;
}

type DashboardProviderProps = {
	children: ReactNode;
};

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
	const [gridData, setGridData] = useState<GridData>({
		view: localStorage.getItem('d_view') || 'grid',
	});
	localStorage.setItem('d_view', gridData.view);
	const values = useMemo(
		() => ({
			gridData,
			setGridData,
		}),
		[gridData],
	);

	return <DashboardContext.Provider value={values}>{children}</DashboardContext.Provider>;
};
