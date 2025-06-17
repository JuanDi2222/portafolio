"use client"
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { toast } from "sonner"

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
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center pt-3">
              Contact
            </h2>
                        <div className="grid grid-cols-3 gap-20 mt-4 justify-center w-fit mx-auto">
              <Card className="p-2 flex items-center justify-center h-64 w-64 ">
                <Link href="https://www.linkedin.com/in/juan-diego-silva-tello-43a48b1a9" target="_blank" rel="noopener noreferrer">
                  <Image src="/linkedin.svg" alt="LinkedIn Logo" width={800} height={800} className="p-3" />
                  <p className="leading-7 [&:not(:first-child)]: text-center pb-4">
                    Linkedin
                  </p>
                </Link>
              </Card>
              <Card className="p-2 flex items-center justify-center h-64 w-64">
                <Link href="https://github.com/JuanDi2222" target="_blank" rel="noopener noreferrer">
                  <Image src="/github.png" alt="Github Logo" width={800} height={800} className="p-3" />
                  <p className="leading-7 [&:not(:first-child)]: text-center pb-4">
                    Github
                  </p>
                </Link>
              </Card>
              <Card
                onClick={() => {
                  navigator.clipboard.writeText("juandiegosilvatello@gmail.com");
                  toast(
                    "Email copied to clipboard!",
                   );
                }}
                className="p-2 flex items-center justify-center h-64 w-64 cursor-pointer"
              >
                <Image src="/mail.png" alt="Mail Logo" width={800} height={800} className="p-3" />
                <p className="leading-7 [&:not(:first-child)]: text-center">
                  Email
                </p>
              </Card>
            </div>

          </CardContent>
        </Card>
      </div>
    </>
  );
}
