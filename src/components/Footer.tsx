import { Spotlight } from "./UI/SpotLight";
import ScrollReveal from "./UI/ScrollReveal";
import StarBorder from "./UI/StarBorder";
import { cn } from "@/lib/utils";
import HoverText from "./UI/HoverText";

export default function Footer() {
  return (
    <footer className="relative flex h-[40rem] w-full overflow-hidden  bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )}
      />

      <Spotlight
        className="left-0 -top-40 md:-top-20 md:left-60"
        fill="white"
      />
      <div className="container flex flex-col items-center justify-center ">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          containerClassName="text-bgLight selection:text-black selection:bg-bgLight"
          textClassName=" text-center "
        >
          Your brilliant ideas require excellent execution.
        </ScrollReveal>
        <StarBorder
          as="a"
          className="my-10"
          btnClassName="hover:opacity-80 transition-colors duration-600 text-white font-bold text-2xl py-6 px-12 bg-black"
          speed="5s"
          href="mailto:mohannadwebdev@gmail.com?subject=Collaboration%20Opportunity&body=Hello%2C%0A%0AI%20found%20your%20profile%20and%20think%20you’d%20be%20a%20great%20fit%20for%20a%20project%20I’m%20working%20on.%20I’d%20appreciate%20your%20insights.%0A%0ACan%20we%20schedule%20a%20time%20to%20chat%3F"
          aria-label="Send me an email to discuss your project"
          style={{
            transform: "scale(1.3)",
            backgroundColor:"black"
          }}
        >
          Let&apos;s Talk
        </StarBorder>
        <p  className="p-2 my-4 text-lg text-center z-1 ">Don&apos;t like flashy buttons? Reach out at MohannadWebDev@gmail.com</p>
   
        <div className="flex items-center justify-center gap-4 z-1">
          <a
            href="https://github.com/MohannadDev"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-colors duration-300 hover:text-white"
            aria-label="View my GitHub profile"
          >
            <HoverText
              text="GITHUB"
              variant="from-cursor"
              baseColor="var(--color-textMuted)"
              hoverColor="var(--color-textHighlight)"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/mohannaddev/"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-colors duration-300 hover:text-white"
            aria-label="Connect with me on LinkedIn"
          >
            <HoverText
              text="LINKEDIN"
              variant="from-cursor"
              baseColor="var(--color-textMuted)"
              hoverColor="var(--color-textHighlight)"
            />
          </a>

          <a
            href="mailto:mohannadwebdev@gmail.com?subject=Collaboration%20Opportunity&body=Hello%2C%0A%0AI%20found%20your%20profile%20and%20think%20you’d%20be%20a%20great%20fit%20for%20a%20project%20I’m%20working%20on.%20I’d%20appreciate%20your%20insights.%0A%0ACan%20we%20schedule%20a%20time%20to%20chat%3F"
            className="block transition-colors duration-300 hover:text-white"
            aria-label="Send me an email"
          >
            <HoverText
              text="EMAIL"
              variant="from-cursor"
              baseColor="var(--color-textMuted)"
              hoverColor="var(--color-textHighlight)"
            />
          </a>
        </div>
      </div>
    </footer>

  );
}
