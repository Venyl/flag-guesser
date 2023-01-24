import { Link } from 'react-router-dom';
import Card from './components/Card';

function App() {
    return (
        <>
            <h1 className="text-5xl font-black text-center md:text-7xl text-neutral-100">
                Welcome to Flag Guesser! 🏳️
            </h1>
            <div>
                <h2 className="text-center text-3xl font-bold text-neutral-400 md:text-5xl">
                    Choose the difficulty:
                </h2>
                <div className="grid grid-cols-auto gap-4 mt-6 mx-4">
                    <Link to="/easy">
                        <Card title="Easy" emoji="😄" color="text-green-400">
                            Flags everybody should know
                        </Card>
                    </Link>
                    <Link to="/medium">
                        <Card title="Medium" emoji="😐" color="text-yellow-300">
                            Lesser known flags
                        </Card>
                    </Link>

                    <Link to="/hard">
                        <Card title="Hard" emoji="😵‍💫" color="text-red-400">
                            Really uncommon flags
                        </Card>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default App;
