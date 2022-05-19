import { useEffect, useState } from 'react';

export const useQueryV2 = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [ error, setError ] = useState(null);


	return {
		data,
		loading,
		error,
	};
};
