import { useQuery, useQueryClient } from '@tanstack/react-query';
import Game from './Game';

interface Props {
    mode: 'easy' | 'medium' | 'hard';
}

export default function FlagGuesser({ mode }: Props) {
    async function getCountries() {
        const countryCodes = await import('./countryCodes');
        const selectedCountryCodes = countryCodes[mode];
        const response = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${selectedCountryCodes.join(',')}`
        );
        const json = await response.json();
        return json;
    }

    const query = useQuery({ queryKey: ['countries'], queryFn: getCountries });
    if (!query.isFetchedAfterMount) return <h1>Loading...</h1>;

    return (
        <div>
            <Game data={query.data} />
        </div>
    );
}
