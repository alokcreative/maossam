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

type ProductContextType = {
	gridData: GridData;
	setGridData: Dispatch<SetStateAction<GridData>>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function useProduct() {
	const context = useContext(ProductContext);
	if (!context) {
		throw new Error('useProduct must be used within a ProductProvider');
	}
	return context;
}

type ProductProviderProps = {
	children: ReactNode;
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
	const [gridData, setGridData] = useState<GridData>({
		view: localStorage.getItem('p_view') || 'grid',
	});
	localStorage.setItem('p_view', gridData.view);
	const values = useMemo(
		() => ({
			gridData,
			setGridData,
		}),
		[gridData],
	);

	return <ProductContext.Provider value={values}>{children}</ProductContext.Provider>;
};
