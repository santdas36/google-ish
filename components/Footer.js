import { LocationMarkerIcon } from "@heroicons/react/outline";

const Footer = () => {
  return (
    <footer>
      <span>
        <LocationMarkerIcon /> Anglais | Lingala <a href="#">Tshiluba</a>
        <a href="#">KiKongo</a>
        <a href="#">Swahili</a>
        <a href="#">Plus...</a>
      </span>
      <span className="fright">
        <a href="#">Politique</a>
        <a href="#">T&C</a>
        <a href="#">A-propôs</a>
      </span>
    </footer>
  );
};

export default Footer;
