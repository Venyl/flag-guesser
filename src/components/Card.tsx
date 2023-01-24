interface Props {
    title: string;
    emoji: string;
    color?: string;
    children?: React.ReactNode;
}

export default function Card({ title, emoji, color = 'text-neutral-200', children }: Props) {
    return (
        <div className="bg-primary-800 rounded-md px-8 py-4 grid place-items-center transition-transform hover:scale-105">
            <h3 className={`font-bold text-2xl ${color} md:text-3xl`}>{title}</h3>
            <div className="text-xl">{emoji}</div>
            <p className="mt-4 text-lg">{children}</p>
        </div>
    );
}
