"use client"

import * as React from "react"
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"

export default function Home() {
    const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  const truckRef = useRef<HTMLImageElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const contentRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const truck = truckRef.current;
    if (truck) {
      const card = truck.parentElement?.parentElement?.parentElement;
      if (card) {
        const cardWidth = card.offsetWidth;
        const truckWidth = truck.offsetWidth;

        const animateTruck = () => {
          gsap.set(truck, { x: cardWidth - truckWidth, scaleX: 1 });
          gsap.to(truck, {
            x: 0,
            duration: 10,
            ease: "power1.inOut",
            onComplete: () => {
              gsap.to(truck, {
                scaleX: -1,
                duration: 0.5,
                onComplete: () => {
                  gsap.to(truck, {
                    x: cardWidth - truckWidth,
                    duration: 10,
                    ease: "power1.inOut",
                    onComplete: () => {
                      gsap.to(truck, {
                        scaleX: 1,
                        duration: 0.5,
                        onComplete: animateTruck,
                      });
                    },
                  });
                },
              });
            },
          });
        };
        animateTruck();
      }
    }
    return () => {
      if (truck) gsap.killTweensOf(truck);
    };
  }, []);

  useEffect(() => {
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 60,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(contentRefs.current, {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      delay: 0.5,
      duration: 1,
      ease: "power2.out",
    });
  }, []);
  const setCardRef = (el: HTMLDivElement | null, idx: number) => {
    if (el) cardsRef.current[idx] = el;
  };
  const setContentRef = (el: HTMLDivElement | null, idx: number) => {
    if (el) contentRefs.current[idx] = el;
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 mt-8">
        {/* Card 1 */}
        <Card
          ref={el => setCardRef(el as HTMLDivElement, 0)}
          className="shadow-xl border-none w-full relative overflow-hidden"
          style={{ minHeight: 120 }}
        >
          <CardContent ref={el => setContentRef(el as HTMLDivElement, 0)}>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center pt-3">
              3D Modeling / Sculpting for 3d printing
            </h2>
            <div className="mx-auto w-full">
      <Carousel setApi={setApi}
            plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]} className="w-full pt-10">
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-64 flex items-center justify-center"> {/* Set fixed height */}
            <Image
              src={`/${index + 1}.png`}
              alt={`Image ${index + 1}`}
              width={1000}
              height={1000}
              className="object-contain w-full h-full max-h-64" // Contain, not cover
            />
          </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="text-muted-foreground py-2 text-center text-sm">
        Slide {current} of {count}
      </div>
    </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
