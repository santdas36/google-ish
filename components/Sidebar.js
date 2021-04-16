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
          <HomeIcon /> Home
        </li>
        <li>
          <ClockIcon /> Search History
        </li>
        <li>
          <CollectionIcon /> Collections
        </li>
        <li>
          <StatusOfflineIcon /> Offline Searches
        </li>
        <hr />
        <li>
          <AdjustmentsIcon /> Settings
        </li>
        <li>
          <UserGroupIcon /> Data & Privacy
        </li>
        <li>
          <EyeOffIcon /> Hide Explicit Results
        </li>
        <li>
          <InformationCircleIcon /> Help & Support
        </li>
        <li>
          <ChatAltIcon /> Send Feedback
        </li>
      </ul>
    </div>
  );
});

export default Sidebar;
