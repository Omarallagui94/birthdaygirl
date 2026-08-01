import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Cake,
  CakeSlice,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Crown,
  Info,
  LockKeyhole,
  Maximize,
  Menu,
  Music2,
  Pause,
  Play,
  Search,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { memories, messages, rows, Memory } from "./data";
import "./styles.css";

const profiles = [
  ["Ahlem", Crown],
  ["Omar", CircleUserRound],
  ["Frea", CircleUserRound],
  ["Jad", CircleUserRound],
];
function Logo() {
  return (
    <div className="logo">
      <span>H</span>ER STORY <small>Birthday original</small>
    </div>
  );
}
function Intro({ done }: { done: () => void }) {
  return (
    <motion.div
      className="intro videoIntro"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <video
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={done}
        aria-label="Birthday cinematic intro"
      >
        <source src="/videos/birthday-intro.mp4" type="video/mp4" />
      </video>
      <div className="introVignette" />
      <button className="skip" onClick={done}>
        Skip intro
      </button>
    </motion.div>
  );
}
function Profiles({ enter }: { enter: () => void }) {
  const [toast, setToast] = useState(false);
  return (
    <motion.main
      className="profiles"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Logo />
      <h1>Who’s celebrating today?</h1>
      <div className="profileGrid">
        {profiles.map(([n, I], i) => (
          <motion.button
            key={n as string}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => (i ? setToast(true) : enter())}
            className={i === 0 ? "featured" : "lockedProfile"}
            aria-disabled={i > 0}
          >
            <div className={"avatar a" + i}>
              <I size={i === 0 ? 44 : 38} />
              {i === 0 && <span className="crown">♛</span>}
              {i > 0 && (
                <span className="profileLock" aria-hidden="true">
                  <LockKeyhole size={18} />
                </span>
              )}
            </div>
            <span>{n as string}</span>
            {i === 0 && <small>MAIN CHARACTER</small>}
            {i > 0 && <small className="lockedLabel">LOCKED</small>}
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setToast(false)}
          >
            This profile is locked. Ahlem is the only main character today.{" "}
            <X size={16} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
function Navbar({ back }: { back: () => void }) {
  const [dark, setDark] = useState(false),
    [open, setOpen] = useState(false);
  useEffect(() => {
    let f = () => setDark(scrollY > 50);
    addEventListener("scroll", f);
    return () => removeEventListener("scroll", f);
  }, []);
  return (
    <nav className={dark ? "dark" : ""}>
      <Logo />
      <button className="hamb" onClick={() => setOpen(!open)} aria-label="Menu">
        <Menu />
      </button>
      <div className={open ? "navlinks open" : "navlinks"}>
        <a href="#home">Home</a>
        <a href="#story">Our Story</a>
        <a href="#memories">Memories</a>
        <a href="#messages">Special Messages</a>
        <a href="#finale">Favorites</a>
      </div>
      <div className="tools">
        <Search />
        <button onClick={back} aria-label="Back to profiles">
          <CircleUserRound />
        </button>
      </div>
    </nav>
  );
}
function Hero({ openVideo }: { openVideo: () => void }) {
  return (
    <section className="hero" id="home">
      <div className="heroBg" />
      <button
        className="heroPosterHit"
        onClick={openVideo}
        aria-label="Play featured birthday video"
      >
        <span>
          <Play fill="currentColor" /> Play featured video
        </span>
      </button>
      <motion.div
        className="heroCopy"
        initial={{ opacity: 0, x: -35 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25, duration: 0.8 }}
      >
        <div className="eyebrow">
          <span>H</span> BIRTHDAY ORIGINAL
        </div>
        <h1>
          The Birthday
          <br />
          <em>Girl</em>
        </h1>
        <h3>A new chapter begins</h3>
        <p>
          She has brought happiness, laughter, and unforgettable memories into
          every chapter. Today, a brand-new season begins.
        </p>
        <div className="meta">
          <b>98% adored</b>
          <span>REPLACE: Birthday date</span>
          <i>100% Amazing</i>
        </div>
        <div className="heroBtns">
          <button className="primary" onClick={openVideo}>
            <Play fill="currentColor" />
            Play featured video
          </button>
          <button
            onClick={() =>
              document
                .querySelector("#story")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Info />
            More info
          </button>
        </div>
      </motion.div>
      <a href="#memories" className="down">
        <ChevronDown />
      </a>
    </section>
  );
}
function Card({ m, open }: { m: Memory; open: () => void }) {
  return (
    <motion.button
      className={"card " + (m.wide ? "wide" : "")}
      whileHover={{ y: -8, scale: 1.025 }}
      onClick={open}
    >
      <img loading="lazy" src={m.image} />
      <div className="shade" />
      <div className="cardInfo">
        {m.badge && <b>{m.badge}</b>}
        <h3>{m.title}</h3>
        <span>
          {m.date} · {m.category}
        </span>
        <i />
      </div>
    </motion.button>
  );
}
function Carousel({
  title,
  ids,
  onOpen,
}: {
  title: string;
  ids: number[];
  onOpen: (m: Memory) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  let slide = (n: number) =>
    ref.current?.scrollBy({ left: n * 440, behavior: "smooth" });
  return (
    <section className="carousel">
      <div className="rowHead">
        <h2>{title}</h2>
        <span>
          Explore collection <ChevronRight />
        </span>
      </div>
      <button
        className="slide left"
        onClick={() => slide(-1)}
        aria-label="Scroll left"
      >
        <ChevronLeft />
      </button>
      <div className="cards" ref={ref}>
        {ids.map((id) => {
          let m = memories.find((x) => x.id === id)!;
          return <Card key={id} m={m} open={() => onOpen(m)} />;
        })}
      </div>
      <button
        className="slide right"
        onClick={() => slide(1)}
        aria-label="Scroll right"
      >
        <ChevronRight />
      </button>
    </section>
  );
}
function Modal({
  m,
  close,
  move,
}: {
  m: Memory;
  close: () => void;
  move: (n: number) => void;
}) {
  useEffect(() => {
    let f = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
    };
    addEventListener("keydown", f);
    return () => removeEventListener("keydown", f);
  }, [m]);
  return (
    <motion.div
      className="modalWrap"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <motion.article
        className="modal"
        initial={{ scale: 0.92, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 30 }}
        role="dialog"
        aria-modal="true"
      >
        <button className="close" onClick={close} aria-label="Close">
          <X />
        </button>
        <div className="modalHero">
          <img src={m.image} />
          <div />
          <div className="modalTitle">
            {m.badge && <b>{m.badge}</b>}
            <h2>{m.title}</h2>
            <span>
              {m.date} · {m.category}
            </span>
          </div>
        </div>
        <div className="modalBody">
          <p>{m.message}</p>
          <dl>
            <dt>Location</dt>
            <dd>{m.location}</dd>
            <dt>Featuring</dt>
            <dd>REPLACE: Add names</dd>
          </dl>
        </div>
        <button className="modalArrow prev" onClick={() => move(-1)}>
          <ArrowLeft />
        </button>
        <button className="modalArrow next" onClick={() => move(1)}>
          <ArrowRight />
        </button>
      </motion.article>
    </motion.div>
  );
}
function Messages() {
  return (
    <section id="messages" className="messages">
      <div className="sectionTag">FEATURED COLLECTION · 3 EPISODES</div>
      <h2>Messages from the cast</h2>
      <p>
        The people who know her best have a few words for the star of the show.
      </p>
      <div className="messageGrid">
        {messages.map((m, i) => (
          <motion.article key={i} whileHover={{ y: -7 }}>
            <div className={"msgAvatar m" + i}>{m.name.charAt(9) || "♥"}</div>
            <span>EPISODE 0{i + 1}</span>
            <h3>{m.name}</h3>
            <small>{m.role}</small>
            <p>“{m.text}”</p>
            <button>
              <Play size={15} fill="currentColor" /> Read message
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
function Timeline() {
  let data = [
    [
      "Season 1",
      "The Corona Days",
      "Our first birthday together—the first frame of everything that followed.",
      "/images/memories/memory-01.jpg",
    ],
    [
      "Season 2",
      "The Distances Build Up",
      "Another birthday, surrounded by favorite places and a thousand little moments.",
      "/images/memories/memory-03.jpg",
    ],
    [
      "Season 3",
      "Back Again",
      "We grew closer, faced challenges, and kept choosing one another.",
      "/images/memories/memory-06.jpg",
    ],
    [
      "Season 4",
      "A New Chapter",
      "A year of family celebrations, adventures, and memories we still replay.",
      "/images/memories/memory-22.jpg",
    ],
    [
      "Current season",
      "Our Fifth Birthday",
      "The fifth birthday I get to celebrate beside you—and my favorite season yet.",
      "/images/memories/memory-24.jpg",
    ],
  ];
  return (
    <section id="story" className="timeline">
      <div className="sectionTag">FIVE BIRTHDAYS · THE STORY SO FAR</div>
      <h2>Every year, a new season</h2>
      <div className="timeLine">
        {data.map((x, i) => (
          <motion.article
            key={x[0]}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="timelinePhoto">
              <img src={x[3]} loading="lazy" alt={x[1]} />
              <span>0{i + 1}</span>
            </div>
            <b>{x[0]}</b>
            <h3>{x[1]}</h3>
            <p>{x[2]}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
function Finale({ replay, back }: { replay: () => void; back: () => void }) {
  return (
    <section className="finale romanticFinale" id="finale">
      {Array.from({ length: 36 }).map((_, i) => (
        <i
          key={i}
          style={
            {
              "--x": `${(i * 43) % 100}%`,
              "--d": `${(i % 9) * 0.45}s`,
              "--s": `${0.55 + (i % 5) * 0.18}`,
            } as React.CSSProperties
          }
        />
      ))}
      <div className="loveOrbit">
        <span>♥</span>
        <span>♥</span>
        <span>♥</span>
      </div>
      <motion.div
        className="finaleContent"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Cake size={54} />
        <div className="sectionTag">OUR FAVORITE LOVE STORY</div>
        <h2>
          Happy Birthday,
          <br />
          <em>Ahlem</em>
        </h2>
        <p>
          Five birthdays, countless memories, and somehow I fall for you more in
          every chapter. Thank you for being the most beautiful part of my
          story.
        </p>
        <small>
          With all my love, today and in every season still to come. ♥
        </small>
        <div>
          <button className="primary" onClick={replay}>
            <Play />
            Replay our story
          </button>
          <button onClick={back}>
            <CircleUserRound />
            Back to profiles
          </button>
        </div>
      </motion.div>
    </section>
  );
}
function Music() {
  const [on, setOn] = useState(false);
  return (
    <div className="music">
      <button onClick={() => setOn(!on)} aria-label="Toggle music">
        {on ? <Pause /> : <Music2 />}
      </button>
      <span>
        {on ? "Music ready · Add /public/audio/song.mp3" : "Music off"}
      </span>
      {on ? <Volume2 /> : <VolumeX />}
    </div>
  );
}
function AudioManager({ videoOpen }: { videoOpen: boolean }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(true);
  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    const resume = () => {
      if (on) a.play().catch(() => setOn(false));
    };
    if (videoOpen) {
      a.pause();
      const featured = document.querySelector<HTMLVideoElement>(
        ".cinematicPlayer video",
      );
      featured?.addEventListener("ended", resume, { once: true });
      return () => featured?.removeEventListener("ended", resume);
    }
    resume();
  }, [videoOpen, on]);
  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      a.play()
        .then(() => setOn(true))
        .catch(() => setOn(false));
    } else {
      a.pause();
      setOn(false);
    }
  };
  return (
    <>
      <audio
        ref={audio}
        id="birthdayMusic"
        src="/audio/somewhere-only-we-know.mp3"
        loop
        preload="auto"
      />
      <div className="music">
        <button onClick={toggle} aria-label={on ? "Pause music" : "Play music"}>
          {on ? <Pause /> : <Music2 />}
        </button>
        <span>
          {videoOpen
            ? "Paused for featured video"
            : on
              ? "Somewhere Only We Know"
              : "Music off"}
        </span>
        {on && !videoOpen ? <Volume2 /> : <VolumeX />}
      </div>
    </>
  );
}
function FeaturedVideo({ close }: { close: () => void }) {
  const video = useRef<HTMLVideoElement>(null),
    box = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true),
    [time, setTime] = useState(0),
    [duration, setDuration] = useState(0),
    [muted, setMuted] = useState(false);
  const toggle = () => {
    let v = video.current;
    if (!v) return;
    v.paused ? v.play() : v.pause();
  };
  const fmt = (n: number) =>
    `${Math.floor(n / 60)}:${Math.floor(n % 60)
      .toString()
      .padStart(2, "0")}`;
  useEffect(() => {
    let f = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === " ") {
        e.preventDefault();
        toggle();
      }
    };
    addEventListener("keydown", f);
    return () => removeEventListener("keydown", f);
  }, []);
  return (
    <motion.div
      className="modalWrap videoModalWrap"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        ref={box}
        className="featuredVideo cinematicPlayer"
        initial={{ scale: 0.94, y: 25 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 25 }}
        role="dialog"
        aria-modal="true"
        aria-label="Featured birthday video"
      >
        <div className="playerTop">
          <button onClick={close} aria-label="Back">
            <ArrowLeft />
          </button>
          <span>
            <b>Now Playing</b> Birthday Girl · Featured Memory
          </span>
        </div>
        <video
          ref={video}
          autoPlay
          playsInline
          poster="/images/pic-poster.jpg"
          src="/videos/theMainVid.mp4"
          onClick={toggle}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={() => setPlaying(false)}
        >
          Your browser does not support this video.
        </video>
        <button
          className="centerPlay"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <Pause fill="currentColor" />
          ) : (
            <Play fill="currentColor" />
          )}
        </button>
        <div className="playerControls">
          <input
            className="seek"
            aria-label="Video progress"
            type="range"
            min="0"
            max={duration || 0}
            step=".1"
            value={time}
            style={
              {
                "--progress": `${duration ? (time / duration) * 100 : 0}%`,
              } as React.CSSProperties
            }
            onChange={(e) => {
              if (video.current)
                video.current.currentTime = Number(e.target.value);
            }}
          />
          <div className="controlRow">
            <button onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
              {playing ? (
                <Pause fill="currentColor" />
              ) : (
                <Play fill="currentColor" />
              )}
            </button>
            <button
              onClick={() => {
                if (video.current) {
                  video.current.muted = !muted;
                  setMuted(!muted);
                }
              }}
              aria-label="Mute"
            >
              {muted ? <VolumeX /> : <Volume2 />}
            </button>
            <span>
              {fmt(time)} / {fmt(duration)}
            </span>
            <strong>Featured Memory</strong>
            <button
              onClick={() => box.current?.requestFullscreen()}
              aria-label="Fullscreen"
            >
              <Maximize />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
function Home({ back, replay }: { back: () => void; replay: () => void }) {
  const [modal, setModal] = useState<Memory | null>(null),
    [video, setVideo] = useState(false);
  let move = (n: number) =>
    setModal((x) =>
      x
        ? memories[
            (memories.indexOf(x) + n + memories.length) % memories.length
          ]
        : null,
    );
  return (
    <>
      <Navbar back={back} />
      <Hero openVideo={() => setVideo(true)} />
      <main className="catalog" id="memories">
        {rows.map((r) => (
          <Carousel
            key={r[0] as string}
            title={r[0] as string}
            ids={r[1] as number[]}
            onOpen={setModal}
          />
        ))}
      </main>
      <Timeline />
      <Finale replay={replay} back={back} />
      <AudioManager videoOpen={video} />
      <AnimatePresence>
        {modal && <Modal m={modal} close={() => setModal(null)} move={move} />}{" "}
        {video && <FeaturedVideo close={() => setVideo(false)} />}
      </AnimatePresence>
    </>
  );
}
function App() {
  const introKey = "birthdayIntroVideoV3";
  const [page, setPage] = useState<"intro" | "profiles" | "home">(() =>
    sessionStorage.getItem(introKey) ? "profiles" : "intro",
  );
  let finish = () => {
    sessionStorage.setItem(introKey, "1");
    setPage("profiles");
  };
  let replay = () => {
    sessionStorage.removeItem(introKey);
    setPage("intro");
  };
  return (
    <AnimatePresence mode="wait">
      {page === "intro" ? (
        <Intro key="i" done={finish} />
      ) : page === "profiles" ? (
        <Profiles key="p" enter={() => setPage("home")} />
      ) : (
        <Home key="h" back={() => setPage("profiles")} replay={replay} />
      )}
    </AnimatePresence>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
