import Head from "next/head";
import { useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Apps from "../components/Apps";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

import {
  MenuAlt1Icon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { SparklesIcon } from "@heroicons/react/solid";

export default function Home() {
  const router = useRouter();
  const toggleSwitch = useRef(null);
  const appDiv = useRef(null);
  const sidebarRef = useRef(null);
  const searchInput = useRef(null);
  const searchBox = useRef(null);

  const toggleTheme = (e) => {
    e.preventDefault();
    appDiv.current.classList.toggle("dark");
    toggleSwitch.current.classList.toggle("dark");
  };
  const openSidebar = (e) => {
    e.preventDefault();
    sidebarRef.current.classList.add("open");
  };

  const search = (e) => {
    e.preventDefault();
    const query = searchInput.current.value;
    if (!query) {
      searchInput.current.focus();
    } else {
      router.push(`/search?q=${query}`);
    }
  };

  return (
    <div className="app" ref={appDiv}>
      <Head>
        <title>Google-ish</title>
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/2/2d/Google-favicon-2015.png"
        />
      </Head>

      <header>
        <Sidebar ref={sidebarRef} />
        <span>
          <button className="sidebarToggle icon" onClick={openSidebar}>
            <MenuAlt1Icon />
          </button>
          <ul className="nav">
            <li>Images</li>
            <li>Videos</li>
            <li>News</li>
            <li>Explore</li>
          </ul>
        </span>
        <span>
          <div
            className="themeToggle icon"
            ref={toggleSwitch}
            onClick={toggleTheme}
          >
            <SunIcon className="sun" />
            <MoonIcon className="moon" />
          </div>
          <Apps />
          <div className="user">
            <UserCircleIcon />
            <span className="uid">
              <span className="top">My Account</span>
            </span>
          </div>
        </span>
      </header>

      <main>
        <div className="logo">
          <img src="/google.png" />
          <img className="shadow" src="/google.png" />
        </div>
        <div className="searchContainer">
          <form onSubmit={search} className="search" ref={searchBox}>
            <SearchIcon className="searchIcon" />
            <input
              type="text"
              placeholder="Type your query..."
              ref={searchInput}
              onFocus={() => searchBox.current.classList.add("focus")}
              onBlur={() => searchBox.current.classList.remove("focus")}
            />
            <button type="submit">
              <span>Search</span>
              <SearchIcon className="searchIcon" />
            </button>
          </form>
          <button className="lucky">
            <SparklesIcon />
            Feeling Lucky?
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
