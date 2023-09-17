'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  console.log(error);
  return (
    <div>
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold">500</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Internal Server Error
          </h1>
          <p className="mt-6 text-base leading-7">Something went wrong!</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
