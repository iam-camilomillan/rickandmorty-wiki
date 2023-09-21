import Head from "next/head";
import Image from "next/image";

/* Components imports */
import DataSection from "~/sections/home/DataSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rick and Morty Wiki</title>
        <meta
          name="description"
          content="Rick and morty wiki consumin it's API, made for the web portfolio."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Content */}
      <>
        {/* Hero section */}
        <section className="h-screen">
          {/* Hero background image */}
          <Image
            src="/images/hero_background.jpg"
            alt="Hero background image"
            fill
            objectFit="cover"
            objectPosition="right"
          />

          {/* Hero text */}
          <div className="absolute flex h-full w-full items-center bg-black/25 px-4">
            <div className="mx-auto w-full max-w-5xl">
              <Image
                src="/images/logo.webp"
                alt="Hero background image"
                width={448}
                height={128}
              />
            </div>
          </div>
        </section>

        {/* Home data section */}
        <section className="px-4">
          <div className="relative z-10 mx-auto -mt-16 max-w-5xl rounded-xl bg-neutral-800 p-4">
            {/* Characters */}
            <DataSection categorie="character" amount={10} max={826} />

            <div className="h-4" />

            {/* Locations */}
            <DataSection categorie="location" amount={10} max={126} />

            <div className="h-4" />

            {/* Episodes */}
            <DataSection categorie="episode" amount={10} max={51} />
          </div>
        </section>
      </>
    </>
  );
}
