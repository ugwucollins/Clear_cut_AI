import { FooterLinks, SocialMediaLink } from "../context/assets";
import Container from "../context/Container";
import Logo from "./Bars/Logo";

const Footer = () => {
  return (
    <div className="footer py-10 border border-t border-b-0 border-gray-700 border-x-0">
      <Container>
        <div className="w-full flex flex-row max-sm:flex-wrap items-start gap-5">
          <FooterHeader />
          <div className="w-full flex gap-5 justify-between">
            {FooterLinks.map((item) => (
              <div key={item.title}>
                <p className="font-semibold text-lg py-2">{item.title}</p>
                <div className="flex flex-col opacity-85 gap-y-4">
                  {item.handlePaths.map((list) => (
                    <span
                      key={list.title}
                      className="text-gray-400 hover:cursor-pointer font-medium"
                    >
                      {list.title}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;

export const FooterHeader = () => {
  return (
    <div>
      <Logo />
      <div className="font-semibold py-5 text-gray-400 opacity-90">
        The smartest way to get stunning, high quality cut outs for your
        personal and professional projects
      </div>
      <div className="flex gap-x-3 py-4 text-2xl text-gray-200">
        {SocialMediaLink.map((icon, index) => (
          <div key={index}>{icon.icon}</div>
        ))}
      </div>
    </div>
  );
};
