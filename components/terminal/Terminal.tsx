"use client";

import { useState, useRef, useEffect } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type TerminalOutput = {
  id: string;
  type: "command" | "result" | "error";
  content: React.ReactNode;
};

export function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalOutput[]>([
    {
      id: "init-1",
      type: "result",
      content: (
        <span className="text-[var(--accent-500)]">
          Welcome to AMAAN_OS v2.0. Type <span className="text-white font-bold">help</span> to see available commands.
        </span>
      ),
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Focus input when clicking anywhere on the terminal window
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const args = trimmedCmd.split(" ").filter(Boolean);
    const baseCmd = args[0]?.toLowerCase();

    const newHistory: TerminalOutput[] = [
      ...history,
      {
        id: Date.now().toString(),
        type: "command",
        content: <span className="text-[var(--text-secondary)]">guest@amaan.dev:~$ <span className="text-[var(--text-primary)]">{trimmedCmd}</span></span>,
      },
    ];

    if (!baseCmd) {
      setHistory(newHistory);
      return;
    }

    let resultMsg: React.ReactNode;
    let type: "result" | "error" = "result";

    switch (baseCmd) {
      case "help":
        resultMsg = (
          <div className="flex flex-col gap-1 text-[var(--accent-300)]">
            <p>Available commands:</p>
            <ul className="pl-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 mt-2">
              <li><span className="text-white">about</span>    - Short bio</li>
              <li><span className="text-white">skills</span>   - List my technical stack</li>
              <li><span className="text-white">projects</span> - View my recent work</li>
              <li><span className="text-white">contact</span>  - Get in touch</li>
              <li><span className="text-white">echo</span>     - Print text back to terminal</li>
              <li><span className="text-white">clear</span>    - Clear terminal output</li>
              <li><span className="text-white">sudo</span>     - Run as administrator</li>
            </ul>
          </div>
        );
        break;
      case "about":
        resultMsg = "I'm a Web Developer based in Bhubaneswar. I specialize in building full-stack applications with React, Next.js, and Node.js. Passionate about sleek modern design and performance.";
        break;
      case "skills":
        resultMsg = (
          <div className="flex flex-col gap-1">
            <p><span className="text-[var(--accent-500)]">Frontend:</span> React, Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP</p>
            <p><span className="text-white">Backend:</span> Node.js, Express, Go, Django, PostgreSQL, MongoDB, Prisma</p>
            <p><span className="text-[var(--text-secondary)]">Tools:</span> Git, Docker, Linux, Supabase, Vercel</p>
          </div>
        );
        break;
      case "projects":
        resultMsg = (
          <div className="flex flex-col gap-1">
            <p>1. <a href="#projects" className="text-[var(--accent-500)] hover:underline border-b border-transparent">DonateApp</a> - Full-stack donation platform for NGOs</p>
            <p>2. <a href="#projects" className="text-[var(--accent-500)] hover:underline border-b border-transparent">HospMan</a> - Internal hospital management dashboard</p>
            <p className="text-[var(--text-secondary)] mt-1">Scroll down to the Projects section to see more!</p>
          </div>
        );
        break;
      case "contact":
        resultMsg = (
          <div className="flex flex-col gap-1">
            <p>Email: <a href="mailto:amaanullahmsc@gmail.com" className="text-[var(--accent-500)] hover:underline">amaanullahmsc@gmail.com</a></p>
            <p>GitHub: <a href="https://github.com/amaan-exe" target="_blank" rel="noreferrer" className="text-[var(--accent-500)] hover:underline">github.com/amaan-exe</a></p>
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        return;
      case "sudo":
        resultMsg = "amaan.dev is not in the sudoers file. This incident will be reported to Santa.";
        type = "error";
        break;
      case "echo":
        resultMsg = args.slice(1).join(" ");
        if (!resultMsg) resultMsg = "echo: missing text to print";
        break;
      case "pwd":
        resultMsg = "/home/guest/portfolio";
        break;
      case "whoami":
        resultMsg = "guest";
        break;
      case "ls":
        resultMsg = "about.txt  skills.json  projects/  resume.pdf";
        break;
      default:
        resultMsg = `Command not found: ${baseCmd}. Type 'help' to see available commands.`;
        type = "error";
    }

    setHistory([
      ...newHistory,
      {
        id: (Date.now() + 1).toString(),
        type,
        content: resultMsg,
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    }
  };

  return (
    <div 
      className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-[var(--bg-border)] shadow-2xl bg-[#0d0f1a] font-mono text-sm md:text-base relative group"
      onClick={handleTerminalClick}
    >
      {/* Terminal Header (Mac-style) */}
      <div className="flex items-center px-4 py-3 bg-[#0a0c14] border-b border-[var(--bg-border)]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex-1 text-center text-xs text-[var(--text-secondary)] flex items-center justify-center gap-2">
          <span className="opacity-50">guest@amaan.dev:~</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={containerRef}
        className="p-6 h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--bg-border)] scrollbar-track-transparent cursor-text"
      >
        <div className="flex flex-col gap-3">
          {history.map((item) => (
            <div 
              key={item.id} 
              className={`leading-relaxed ${item.type === "error" ? "text-red-400" : "text-[var(--text-primary)]"}`}
            >
              {item.content}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[var(--text-secondary)] shrink-0">guest@amaan.dev:~$</span>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-[var(--text-primary)] outline-none border-none opacity-0 absolute inset-0 z-10"
                autoComplete="off"
                spellCheck="false"
                autoCapitalize="off"
              />
              <span className="text-[var(--text-primary)] whitespace-pre">{input}</span>
              <span 
                className={`inline-block w-2.5 h-5 bg-[var(--accent-500)] ml-0.5 ${prefersReducedMotion ? "" : "animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite]"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
