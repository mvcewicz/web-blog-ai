import { FaGithub, FaTwitter } from "react-icons/fa";
import Link from "next/link";

const socialsLinks = [
  {
    name: "GitHub",
    label: "mvcewicz",
    url: "https://github.com/mvcewicz",
    icon: FaGithub,
  },
  {
    name: "X (Twitter)",
    label: "@mvcwcz",
    url: "https://x.com/@mvcwcz",
    icon: FaTwitter,
  },
];

function SocialLinks() {
  return (
    <div className="flex flex-col">
      <ul role="list" className="text-darken flex flex-col gap-4 sm:gap-2">
        {socialsLinks.map((link) => (
          <li
            title={link.name}
            className="text-darken flex gap-2"
            key={link.name}
          >
            <link.icon />
            <Link className="text-xs" href={link.url}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="flex p-4">
      <div>
        <SocialLinks />
      </div>
    </footer>
  );
}
