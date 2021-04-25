import Head from "next/head";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Apps from "../components/Apps";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import styles from "../styles/Search.module.css";
import TextTruncate from "react-text-truncate";

import {
  MenuAlt1Icon,
  UserCircleIcon,
  SearchIcon,
  DocumentSearchIcon,
  PhotographIcon,
  VideoCameraIcon,
  NewspaperIcon,
  MapIcon,
  CogIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/outline";
import { SparklesIcon } from "@heroicons/react/solid";

const ThemeToggle = dynamic(() => import("../components/ThemeToggle"), {
  ssr: false,
});

export default function Search({ results }) {
  const router = useRouter();
  const sidebarRef = useRef(null);
  const searchInput = useRef(null);
  const searchBox = useRef(null);
  const headerRef = useRef(null);
  const [userInp, setUserInp] = useState(router.query.q);

  const queryStartIndex = Number(router.query.s) || 0;

  const openSidebar = (e) => {
    e.preventDefault();
    sidebarRef.current.classList.add("open");
  };

  const goPrev = () => {
    router.push(`/search?q=${router.query.q}&s=${queryStartIndex - 10}`);
  };
  const goNext = () => {
    router.push(`/search?q=${router.query.q}&s=${queryStartIndex + 10}`);
  };

  const search = (e) => {
    e.preventDefault();
    if (!userInp || userInp === router.query.q) {
      return;
    } else {
      e.target.children[0].blur();
      router.push(`/search?q=${userInp}`);
    }
  };

  useEffect(() => {
    const headerScroll = () => {
      if (window.pageYOffset > 90) {
        headerRef.current.classList.add(styles.scrolled);
      } else {
        headerRef.current.classList.remove(styles.scrolled);
      }
    };
    window.addEventListener("scroll", headerScroll);
    return () => window.removeEventListener("scroll", headerScroll);
  }, []);

  return (
    <div className="app">
      <Head>
        <title>{router.query.q} - Google Search</title>
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/2/2d/Google-favicon-2015.png"
        />
      </Head>

      <header ref={headerRef} className={styles.searchHeader}>
        <Sidebar ref={sidebarRef} />
        <span className={styles.headerSearch}>
          <button className="sidebarToggle icon" onClick={openSidebar}>
            <MenuAlt1Icon />
          </button>
          <img
            onClick={() => router.push("/")}
            className={styles.searchLogo}
            src="/google.png"
          />
          <form
            onSubmit={search}
            className={`search ${styles.search} ${styles.desktop}`}
          >
            <input
              type="search"
              value={userInp}
              onChange={(e) => setUserInp(e.target.value)}
            />
          </form>
        </span>
        <span>
          <ThemeToggle />
          <Apps />
          <div className="user">
            <UserCircleIcon />
            <span className="uid">
              <span className="top">My Account</span>
            </span>
          </div>
        </span>
      </header>

      <main className={styles.searchMain}>
        <form
          onSubmit={search}
          className={`search ${styles.search} ${styles.mobile}`}
        >
          <input
            type="search"
            value={userInp}
            onChange={(e) => setUserInp(e.target.value)}
          />
        </form>

        <ul className={styles.options}>
          <li className={`icon ${styles.icon} ${styles.active}`}>
            <DocumentSearchIcon /> <span>All</span>
          </li>
          <li className={`icon ${styles.icon}`}>
            <PhotographIcon /> <span>Images</span>
          </li>
          <li className={`icon ${styles.icon}`}>
            <VideoCameraIcon /> <span>Videos</span>
          </li>
          <li className={`icon ${styles.icon}`}>
            <NewspaperIcon /> <span>News</span>
          </li>
          <li className={`icon ${styles.icon}`}>
            <MapIcon /> <span>Maps</span>
          </li>
          <li className={`icon ${styles.icon}`}>
            <CogIcon /> <span>Search Options</span>
          </li>
        </ul>

        <span className={styles.time}>
          About {results?.searchInformation?.formattedTotalResults} results in{" "}
          {results?.searchInformation?.searchTime} seconds
        </span>

        <ul className={`results ${styles.results}`}>
          {results?.items?.map((result) => (
            <li key={result.link}>
              <a href={result.link}>
                <p className={styles.link}>{result.formattedUrl}</p>
                <p className={styles.title}>{result.title}</p>
                <TextTruncate
                  element="p"
                  line={3}
                  truncateText="..."
                  text={result.snippet}
                  className={styles.extract}
                />
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.navigation}>
          <p>Page ({parseInt(queryStartIndex / 10) + 1})</p>
          {queryStartIndex >= 10 && (
            <button className={`icon ${styles.icon}`} onClick={goPrev}>
              <ArrowLeftIcon />
            </button>
          )}
          <button className={`icon ${styles.icon}`} onClick={goNext}>
            <ArrowRightIcon />
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const useDummyData = false;
  const startIndex = context.query.s || "0";
  const data = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.CSE_API_KEY}&cx=${process.env.CSE_CONTEXT_KEY}&q=${context.query.q}&start=${startIndex}`
  ).then((response) => response.json());
  return {
    props: { results: data },
  };
};
