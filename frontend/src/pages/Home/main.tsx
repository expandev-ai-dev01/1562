export const HomePage = () => {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Bem-vindo ao HORTifruti</h2>
        <p className="text-xl text-gray-600">Produtos frescos e de qualidade para você</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Frutas Frescas</h3>
          <p className="text-gray-600">Variedade de frutas selecionadas diariamente</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Verduras</h3>
          <p className="text-gray-600">Verduras frescas e orgânicas</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Legumes</h3>
          <p className="text-gray-600">Legumes de primeira qualidade</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
