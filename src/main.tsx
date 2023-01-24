import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FlagGuesser from './components/FlagGuesser';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: 'easy',
        element: <FlagGuesser mode="easy" />,
    },
    {
        path: 'medium',
        element: <FlagGuesser mode="medium" />,
    },
    {
        path: 'hard',
        element: <FlagGuesser mode="hard" />,
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <main className="grid place-content-center gap-12 md:gap-24 h-[100vh] bg-primary-900 text-neutral-200">
                <RouterProvider router={router} />
            </main>
        </QueryClientProvider>
    </React.StrictMode>
);
