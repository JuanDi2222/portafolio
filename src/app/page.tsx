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
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Animate heading
    if (headingRef.current) {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: -40,
        duration: 1,
        ease: "power3.out",
      });
    }
    // Animate cards
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 60,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  const setCardRef = (el: HTMLDivElement | null, idx: number) => {
    if (el) cardsRef.current[idx] = el;
  };

  return (
    <>
      <h1
        ref={headingRef}
        className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"
      >
        Juan Diego Silva Tello
      </h1>
      <p className="text-center text-lg text-muted-foreground">
        Full Stack Developer
      </p>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <Card
          ref={el => setCardRef(el as HTMLDivElement, 0)}
          className="shadow-xl border-gray border-2 w-full"
        >
          <CardContent>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
              Skills
            </h2>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              <li>Native Spanish Speaker</li>
              <li>C2 English Proficiency (Almost Native)</li>
              <li> Experienced in Next js Framework</li>
              <li>Experienced in FrontEnd with React, TypeScript, and Tailwind.</li>
              <li>Proficient in BackEnd with Node.js, SQL Language and ORMs.</li>
              <li>Familiar with Git and version control software.</li>
              <li> Soft Skills: Problem solving & critical thinking.</li>
            </ul>
          </CardContent>
        </Card>
        <Card
          ref={el => setCardRef(el as HTMLDivElement, 1)}
          className="shadow-xl border-gray border-2 w-full"
        >
          <CardContent>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
              Education
            </h2>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              <li>Escuela Preparatoria Central de Ciudad Juarez</li>
              <li>Computer Systems Engineering - Tecnologico Nacional de Mexico Campus Ciudad Juarez</li>
            </ul>
          </CardContent>
        </Card>
        <Card
          ref={el => setCardRef(el as HTMLDivElement, 2)}
          className="shadow-xl border-gray border-2 w-full col-span-2"
        >
          <CardContent>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
              Job Experience
            </h2>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight pt-2">
              Robotics Teacher - Centro de Estudios Industria 4.0 (2017-2020)
            </h3>
            <p className="my-2">
              I designed activities linked to interactive robotics learning and the presentation of current technology related topics,
              aimed at generating interest in the field among a young audience. Here, I improved my skills in delivering and assimilating
              knowledge, as well as my abilities in observation, analysis, synthesis, and evaluation.
            </p>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight pt-2">
              Engineering Intern - Phinia Delphi Mexico (2024-2025)
            </h3>
            <p className="my-2">
              In the Shipping and Receiving department, I developed a web application project to streamline material tracking and make data analysis.
              The system replaced manual, paper-based processes with a digital transformation, improving efficiency and traceability.
              Through this project, I strengthened my full stack development skills using React, Node.js, TypeScript, and PostgreSQL, 
              while also improving collaboration, problem-solving, and project planning abilities. Additionally, I gained valuable insight
              into industrial logistics operations, including the coordination of national and international shipments. I was responsible
              for preparing invoices, managing entry requests, and maintaining accurate records of internal processes. 
              This experience enhanced my understanding of supply chain workflows and strengthened my attention to detail, 
              organization, and operational efficiency.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
