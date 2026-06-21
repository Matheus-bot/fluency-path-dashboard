"use client"

import Image from "next/image"
import { useState } from "react"
import { Play } from "lucide-react"
import { VIDEO } from "@/lib/fluency-data"
import { Section } from "./section"

export function WatchVideo() {
  const [playing, setPlaying] = useState(false)

  return (
    <Section step={2} title="Watch the Video">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="relative aspect-video w-full bg-black">
          {playing ? (
            <iframe
              className="absolute inset-0 size-full"
              src={`https://www.youtube.com/embed/${VIDEO.youtubeId}?autoplay=1`}
              title={VIDEO.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 size-full cursor-pointer"
              aria-label={`Play video: ${VIDEO.title}`}
            >
              <Image
                src="/images/tiny-habits-thumbnail.png"
                alt={`Thumbnail for ${VIDEO.title}`}
                fill
                className="object-cover"
                priority
              />
              <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
              <span className="absolute left-4 top-4 flex items-center gap-2 text-sm font-medium text-white drop-shadow">
                <span className="flex h-4 w-6 items-center justify-center rounded bg-red-600">
                  <Play
                    className="size-2.5 fill-white text-white"
                    aria-hidden="true"
                  />
                </span>
                {VIDEO.title}
              </span>
              <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                <Play
                  className="ml-1 size-7 fill-foreground text-foreground"
                  aria-hidden="true"
                />
              </span>
              <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded bg-black/70 px-2 py-1 text-xs font-medium text-white">
                <span className="flex h-3 w-4 items-center justify-center rounded-sm bg-red-600">
                  <Play
                    className="size-2 fill-white text-white"
                    aria-hidden="true"
                  />
                </span>
                Watch on YouTube
              </span>
            </button>
          )}
        </div>
      </div>
    </Section>
  )
}
