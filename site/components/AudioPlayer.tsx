"use client";

import { useRef, useState, useEffect, useCallback } from "react";

// GA4 helper — fires if gtag is available
function trackEvent(name: string, params: Record<string, string | number>) {
  if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: Function }).gtag === "function") {
    (window as unknown as { gtag: Function }).gtag("event", name, params);
  }
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const milestonesHit = useRef<Set<number>>(new Set());

  const checkMilestones = useCallback((current: number, total: number) => {
    if (total <= 0) return;
    const pct = (current / total) * 100;
    for (const milestone of [25, 50, 75, 90]) {
      if (pct >= milestone && !milestonesHit.current.has(milestone)) {
        milestonesHit.current.add(milestone);
        trackEvent("podcast_progress", {
          episode_title: title,
          percent_complete: milestone,
        });
      }
    }
  }, [title]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      setCurrentTime(audio.currentTime);
      checkMilestones(audio.currentTime, audio.duration);
    };
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => {
      setPlaying(false);
      trackEvent("podcast_completed", { episode_title: title });
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
    };
  }, [title, checkMilestones]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      trackEvent("podcast_pause", {
        episode_title: title,
        seconds_played: Math.floor(audio.currentTime),
      });
    } else {
      audio.play();
      trackEvent("podcast_play", {
        episode_title: title,
        seconds_in: Math.floor(audio.currentTime),
      });
    }
    setPlaying(!playing);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(e.target.value);
    setCurrentTime(audio.currentTime);
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
  };

  const cycleSpeed = () => {
    const rates = [1, 1.25, 1.5, 2, 0.75];
    const next = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-5 shadow-lg">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="text-white text-sm font-semibold mb-3 font-sans truncate">
        {title}
      </div>

      {/* Progress bar */}
      <div className="relative mb-3">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={seek}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #8B0000 ${progress}%, #444 ${progress}%)`,
          }}
        />
      </div>

      {/* Time */}
      <div className="flex justify-between text-xs text-gray-400 font-mono mb-4">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() => skip(-15)}
          className="text-gray-400 hover:text-white transition-colors text-xs font-sans font-semibold"
          aria-label="Rewind 15 seconds"
        >
          -15s
        </button>

        <button
          onClick={toggle}
          className="w-12 h-12 rounded-full bg-brand hover:bg-brand-dark transition-colors flex items-center justify-center"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>

        <button
          onClick={() => skip(30)}
          className="text-gray-400 hover:text-white transition-colors text-xs font-sans font-semibold"
          aria-label="Forward 30 seconds"
        >
          +30s
        </button>

        <button
          onClick={cycleSpeed}
          className="text-gray-400 hover:text-white transition-colors text-xs font-sans font-semibold ml-2 border border-gray-600 rounded px-2 py-0.5"
          aria-label="Playback speed"
        >
          {playbackRate}x
        </button>
      </div>
    </div>
  );
}
