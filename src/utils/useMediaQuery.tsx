
import { useEffect, useState } from 'react';

const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const handleResize = () => setMatches(mediaQuery.matches);

        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, [query]);

    return matches;
};


export default useMediaQuery;