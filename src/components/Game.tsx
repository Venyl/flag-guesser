import { useState, useMemo, useEffect } from 'react';
import { RxReload, RxHome } from 'react-icons/rx';
import { RiHome2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

interface ApiCountry {
    name: {
        common: string;
    };
    cca2: string;
    flags: {
        svg: string;
    };
}

interface Country {
    name: string;
    code: string;
    flagUrl: string;
}

interface Props {
    data: ApiCountry[];
    mode: string;
}

export default function Game({ data, mode }: Props) {
    const [score, setScore] = useState<number>(0);
    const [usedCountries, setUsedCountries] = useState<Country[]>([]);
    const [animatedBtn, setAnimatedBtn] = useState<HTMLButtonElement>();

    useEffect(() => {
        const localStorageData = localStorage.getItem(mode);
        if (localStorageData === null) return;
        const [storedScore, storedUsedCountriesStr] = localStorageData.split(';');
        setScore(Number(storedScore));
        const storedUsedCountries = storedUsedCountriesStr?.split(',').map(countryStr => {
            const [name, code, flagUrl] = countryStr.split('+');

            return { name: name!, code: code!, flagUrl: flagUrl! };
        });
        setUsedCountries(storedUsedCountries!);
    }, []);

    useEffect(() => {
        console.log(animatedBtn);
        animatedBtn?.classList.add('shake');
        setTimeout(() => {
            animatedBtn?.classList.remove('shake');
            setAnimatedBtn(undefined);
        }, 450);
    }, [animatedBtn]);

    function guessCountry(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, country: Country) {
        if (country.code === correctCountry?.code) {
            setScore(score => score + 10);
            setUsedCountries(usedCountries => usedCountries.concat(country));
            localStorage.setItem(
                mode,
                `${score + 10};${[...usedCountries, country]
                    .map(el => `${el.name}+${el.code}+${el.flagUrl}`)
                    .join(',')}`
            );
        } else {
            setScore(score => score - 5);
            setAnimatedBtn(e.currentTarget);
            localStorage.setItem(
                mode,
                `${score - 5};${usedCountries
                    .map(el => `${el.name}+${el.code}+${el.flagUrl}`)
                    .join(',')}`
            );
        }
    }

    const countries: Country[] = useMemo(
        () =>
            data.map((country: ApiCountry) => ({
                name: country.name.common,
                code: country.cca2,
                flagUrl: country.flags.svg,
            })),
        []
    );

    function getCorrectCountry() {
        const unusedCountries = countries.filter(country => !usedCountries.includes(country));
        return unusedCountries[Math.floor(Math.random() * unusedCountries.length)];
    }

    let correctCountry: Country | undefined = useMemo(getCorrectCountry, [usedCountries]);

    function getOtherCountries() {
        if (!correctCountry) return [];
        const otherCountries: Country[] = [correctCountry];
        while (otherCountries.length < 4) {
            const chosenCountry = countries[Math.floor(Math.random() * countries.length)];

            if (!chosenCountry) break;
            if (otherCountries.includes(chosenCountry)) continue;

            otherCountries.push(chosenCountry);
        }

        return otherCountries.sort((a, b) => 0.5 - Math.random());
    }

    function reset() {
        localStorage.removeItem(mode);
        setScore(0);
        setUsedCountries([]);
    }

    let chosenCountries: Country[] = useMemo(getOtherCountries, [usedCountries]);
    if (usedCountries.length === countries.length)
        return (
            <div className="flex flex-col gap-8">
                <h1 className="text-2xl">You finished with a score of {score}.</h1>{' '}
                <button
                    className="text-xl bg-pink-800 py-4 rounded-md transition-transform scale-optimized hover:scale-emphasize"
                    onClick={reset}
                >
                    <RxReload />
                </button>
            </div>
        );

    return (
        <div className="flex flex-col gap-8 min-w-[20rem]">
            <div className="grid game-bar items-center">
                <Link to="/">
                    <button className="grid place-items-center text-xl bg-blue-800 py-2 px-6 rounded-md transition-transform scale-optimized hover:scale-emphasize">
                        <RiHome2Line />
                    </button>
                </Link>
                <div className="text-2xl text-center font-bold rounded-md">Score: {score}</div>
                <button
                    className="grid place-items-center text-xl bg-pink-800 py-2 px-6 rounded-md transition-transform scale-optimized hover:scale-emphasize"
                    onClick={reset}
                >
                    <RxReload />
                </button>
            </div>

            <div className="flex flex-col items-center gap-2">
                <progress
                    className="w-full relative"
                    id="progress"
                    value={usedCountries.length}
                    max={countries.length}
                ></progress>
            </div>

            <div className="grid place-items-center max-w-xs h-52 rounded-md">
                <img
                    className="max-h-52"
                    src={correctCountry?.flagUrl}
                    alt={correctCountry?.name}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {chosenCountries.map(country => (
                    <button
                        key={country.code}
                        onClick={e => guessCountry(e, country)}
                        className={`${
                            correctCountry?.code !== country.code && 'wrong'
                        } max-w-[9.5rem] text-xl bg-primary-800 py-8 rounded-md transition-transform scale-optimized hover:scale-emphasize`}
                    >
                        {country.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
