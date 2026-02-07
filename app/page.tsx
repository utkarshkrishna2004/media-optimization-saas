import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content p-8">
      <h1 className="text-2xl mb-4">Theme Test</h1>

      <button className="btn btn-primary">
        Primary Button
      </button>

      <div className="card bg-base-200 mt-6 w-64">
        <div className="card-body">
          <p>This is a card</p>
        </div>
      </div>
    </main>
  );
}
