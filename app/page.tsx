export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="relative w-full h-[75vh] min-h-[520px] overflow-hidden rounded-b-[564px]">
        <div
          className="absolute inset-0 bg-[url('/Assets/hero.png')] bg-cover bg-center"
          aria-hidden="true"
        />
        <div className="absolute left-1/2 bottom-20 -translate-x-1/2 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <button className="w-56 sm:w-auto px-8 py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-lg transition-all hover:scale-[1.02]">
            Get Started
          </button>

          <button className="w-56 sm:w-auto px-8 py-3 rounded-xl text-primary font-semibold border border-primary/50 bg-primary/10 backdrop-blur-sm hover:bg-primary/20 hover:border-primary transition-all">
            Watch Demo
          </button>
        </div>
      </section>
    </main>
  );
}
