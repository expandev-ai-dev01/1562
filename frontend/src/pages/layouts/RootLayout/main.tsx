import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from '@/core/components/ErrorBoundary';

export const RootLayout = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-green-600">HORTifruti</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
        <footer className="bg-white border-t mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-600 text-sm">
              © 2024 HORTifruti. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
};
