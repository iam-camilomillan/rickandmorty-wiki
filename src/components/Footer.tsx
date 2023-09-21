const Footer = () => {
  return (
    <footer className="border-t border-neutral-600 px-8 py-6">
      <p className="text-center opacity-80">
        Built with{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="font-medium transition-colors duration-200 ease-in-out hover:text-cyan-400"
        >
          Next.js
        </a>{" "}
        and{" "}
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          className="font-medium transition-colors duration-200 ease-in-out hover:text-cyan-400"
        >
          Tailwind
        </a>{" "}
        &#8226;{" "}
        <a
          href="https://github.com/iam-camilomillan/rickandmorty-wiki"
          target="_blank"
          className="font-medium transition-colors duration-200 ease-in-out hover:text-cyan-400"
        >
          Project repository.
        </a>
      </p>
    </footer>
  );
};

export default Footer;
