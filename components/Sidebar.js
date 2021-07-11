import { forwardRef, useEffect, useRef } from "react";
import {
  HomeIcon,
  XIcon,
  ClockIcon,
  CollectionIcon,
  StatusOfflineIcon,
  AdjustmentsIcon,
  UserGroupIcon,
  EyeOffIcon,
  ChatAltIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";

const Sidebar = forwardRef((props, ref) => {
  const sidebarList = useRef(null);

  const closeSidebar = (e) => {
    ref.current.classList.remove("open");
  };
  useEffect(() => {
    const sidebarToggle = document.querySelector(".sidebarToggle");

    const hideSidebar = (e) => {
      if (
        !(
          sidebarList.current.contains(e.target) ||
          sidebarToggle.contains(e.target)
        )
      ) {
        ref.current.classList.remove("open");
      }
    };
    window.addEventListener("click", hideSidebar);
    return () => window.removeEventListener("click", hideSidebar);
  }, []);

  return (
    <div className="sidebar" ref={ref}>
      <ul ref={sidebarList}>
        <li className="ilogo">
          <img src="/google.png" />
          <button className="icon closeSidebar" onClick={closeSidebar}>
            <XIcon />
          </button>
        </li>
        <li>
          <HomeIcon /> Accueil
        </li>
        <li>
          <ClockIcon /> Historique de recherche
        </li>
        <li>
          <CollectionIcon /> Collections
        </li>
        <li>
          <StatusOfflineIcon /> Recherches hor ligne
        </li>
        <hr />
        <li>
          <AdjustmentsIcon /> Reglages
        </li>
        <li>
          <UserGroupIcon /> Données & Politique
        </li>
        <li>
          <EyeOffIcon /> Cacher des resultats explicites
        </li>
        <li>
          <InformationCircleIcon /> Aide & Support
        </li>
        <li>
          <ChatAltIcon /> Envoyer Feedback
        </li>
      </ul>
    </div>
  );
});

export default Sidebar;
