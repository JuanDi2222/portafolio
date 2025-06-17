"use client"
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

export default function Home() {
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
            <div style={{ position: "absolute", top: -33, left: 0, width: "100%", pointerEvents: "none" }}>
              <img
                ref={truckRef}
                src="/truck.gif"
                alt="Truck"
                style={{ position: "absolute", top: 0, left: 0, height: 100, width: "auto" }}
              />
            </div>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center pt-3">
              Phinia Delphi Logistics Web App
            </h2>
            <div className="grid grid-cols-2">
              <Image src="/PHIN_BIG.png" alt="Phinia Logo" width={800} height={800} className="rounded-lg p-5" />
              <div className="flex flex-col justify-between p-2">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-left">
                  Link: <a className="text-blue-500 hover:underline" href="https://shipping-and-receiving.vercel.app/" target="_blank" rel="noopener noreferrer">Phinia Logistics App</a>
                </h3>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-left">
                  Repository: <a className="text-blue-500 hover:underline" href="https://github.com/JuanDi2222/Shipping-and-Receiving" target="_blank" rel="noopener noreferrer">Github </a>
                </h3>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-left">
                  Built With:
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-20 mt-4 justify-center w-fit mx-auto">
              <Card className="p-2 flex items-center justify-center h-64 w-64 ">
                <Link href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
                  <Image src="/nextjs.svg" alt="Next.js Logo" width={800} height={800} className="p-3" />
                  <p className="leading-7 [&:not(:first-child)]: text-center pb-4">
                    Next.js
                  </p>
                </Link>
              </Card>
              <Card className="p-2 flex items-center justify-center h-64 w-64">
                <Link href="https://authjs.dev/" target="_blank" rel="noopener noreferrer">
                  <Image src="/auth.png" alt="Auth.js Logo" width={800} height={800} className="p-3" />
                  <p className="leading-7 [&:not(:first-child)]: text-center pb-4">
                    Auth.js
                  </p>
                </Link>
              </Card>
              <Card className="p-2 flex items-center justify-center h-64 w-64">
                <Link href="https://learn.microsoft.com/en-us/graph/use-the-api" target="_blank" rel="noopener noreferrer">
                <Image src="/graph.png" alt="Graph Logo" width={800} height={800} className="p-3" />
                <p className="leading-7 [&:not(:first-child)]: text-center pb-4">
                  Microsoft Graph API
                </p>
                </Link>
              </Card>
              <Card className="p-2 flex items-center justify-center h-64 w-64">
                <Link href="https://neon.com/" target="_blank" rel="noopener noreferrer">
                  <Image src="/neon.png" alt="Neon Logo" width={800} height={800} className="p-3" />
                  <p className="leading-7 [&:not(:first-child)]: text-center pb-4">
                    Neon DB
                  </p>
                </Link>
              </Card>
              <Card className="p-2 flex items-center justify-center h-64 w-64">
                <Link href="https://fedex.com/" target="_blank" rel="noopener noreferrer">
                  <Image src="/fedex.png" alt="FedEx Logo" width={800} height={800} className="p-3" />
                  <p className="leading-7 [&:not(:first-child)]: text-center pb-4">
                    FedEx API
                  </p>
                </Link>
              </Card>
              <Card className="p-2 flex items-center justify-center h-64 w-64">
                <Link href="https://dhl.com/" target="_blank" rel="noopener noreferrer">
                  <Image src="/dhl.png" alt="Neon Logo" width={800} height={800} />
                  <p className="leading-7 [&:not(:first-child)]: text-center pb-4">
                    DHL API
                  </p>
                </Link>
              </Card>
            </div>
          </CardContent>
        </Card>
        <Card
          ref={el => setCardRef(el as HTMLDivElement, 1)}
          className="shadow-xl border-none w-full relative overflow-hidden w-full"
          style={{ minHeight: 120 }}
        >
          <CardContent ref={el => setContentRef(el as HTMLDivElement, 1)}>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center pt-3">
              Mikurena: Entry for Magical Mirai 2025 Programming Contest
            </h2>
            
            <Image src="/miku.gif" alt="Mikurena Logo" width={800} height={800} className="rounded-lg p-5 mx-auto" />

                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
                  Link: <a className="text-blue-500 hover:underline" href="https://mikurena.vercel.app/" target="_blank" rel="noopener noreferrer">Mikurena </a>
                  Repository: <a className="text-blue-500 hover:underline" href="https://github.com/JuanDi2222/mikurena" target="_blank" rel="noopener noreferrer"> Github</a><a> </a>
                  Built With:
                </h3>
                <div className="grid grid-cols-2 gap-20 mt-4 justify-center w-fit mx-auto">
              <Card className="p-2 flex items-center justify-center h-64 w-64 ">
                <Link href="https://github.com/TextAliveJp/textalive-app-api/blob/main/README.en.md" target="_blank" rel="noopener noreferrer">
                  <Image src="/textAlive.png" alt="Text Alive Logo" width={800} height={800} className="p-5" />
                  <p className="leading-7 [&:not(:first-child)]: text-center pb-4">
                    Text Alive API
                  </p>
                </Link>
              </Card>
              <Card className="p-2 flex items-center justify-center h-64 w-64 ">
                <Link href="https://threejs.org/" target="_blank" rel="noopener noreferrer">
                  <Image src="/three.png" alt="Three.js Logo" width={800} height={800} className="p-5" />
                  <p className="leading-7 [&:not(:first-child)]: text-center pb-4">
                    Three.js
                  </p>
                </Link>
              </Card>
                </div>

          </CardContent>
        </Card>
        <Card
          ref={el => setCardRef(el as HTMLDivElement, 1)}
          className="shadow-xl border-none w-full relative overflow-hidden w-full h-200"
          style={{ minHeight: 120 }}
        >
          <CardContent ref={el => setContentRef(el as HTMLDivElement, 1)}>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center pt-3">
              Juan AI
            </h2>
            <h3 className="text-center text-grey-500 text-lg pt-100">
              Work in Progress
            </h3>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
