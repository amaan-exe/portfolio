"use client";

import { useState, useRef, useEffect } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";

type TerminalOutput = {
  id: string;
  type: "command" | "result" | "error" | "system";
  content: React.ReactNode;
};

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalOutput[]>([
    {
      id: "init-1",
      type: "result",
      content: (
        <span className="text-[var(--accent-500)]">
          Welcome to AMAAN_OS v2.0. Type <span className="text-white font-bold">help</span> to see available commands or <span className="text-white font-bold">aicall</span> to talk with my AI setup.
        </span>
      ),
    },
  ]);
  
  // AI Chat State
  const [isAiMode, setIsAiMode] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([]);

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
  }, [history, isAiLoading]);

  const processCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const baseCmd = trimmedCmd.split(" ").filter(Boolean)[0]?.toLowerCase();

    // Command Echo to Terminal
    const promptPrefix = isAiMode ? (
      <span className="text-[var(--text-secondary)]">amaan-ai@chat:~$ <span className="text-[var(--text-primary)]">{trimmedCmd}</span></span>
    ) : (
      <span className="text-[var(--text-secondary)]">guest@amaan.dev:~$ <span className="text-[var(--text-primary)]">{trimmedCmd}</span></span>
    );

    const newHistory: TerminalOutput[] = [
      ...history,
      {
        id: Date.now().toString() + "-cmd",
        type: "command",
        content: promptPrefix,
      },
    ];

    setHistory(newHistory);

    // AI Mode Interception
    if (isAiMode) {
      if (trimmedCmd.toLowerCase() === "exitai") {
        setIsAiMode(false);
        setAiMessages([]);
        setHistory((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "system",
            content: <span className="text-[var(--accent-500)]">Exited AI Chat Mode. Returning to standard shell...</span>
          }
        ]);
        return;
      }

      setIsAiLoading(true);

      const userMessage: ChatMessage = { role: "user", content: trimmedCmd };
      const updatedMessages = [...aiMessages, userMessage];
      setAiMessages(updatedMessages);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch response");
        }

        const assistantMsg: ChatMessage = { role: "assistant", content: data.response };
        setAiMessages([...updatedMessages, assistantMsg]);

        setHistory((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "result",
            content: <div className="text-[var(--text-primary)] whitespace-pre-wrap">{data.response}</div>
          }
        ]);
      } catch (err) {
        setHistory((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "error",
            content: "Error communicating with AI. Server might be busy. Type 'exitai' to return to normal mode."
          }
        ]);
      } finally {
        setIsAiLoading(false);
      }
      return;
    }

    // Standard Terminal Mode
    let resultMsg: React.ReactNode;
    let type: "result" | "error" | "system" = "result";

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
              <li><span className="text-white font-bold tracking-wider text-[var(--accent-500)]">aicall</span>   - Talk to AI Assistant</li>
              <li><span className="text-white">echo</span>     - Print text back to terminal</li>
              <li><span className="text-white">clear</span>    - Clear terminal output</li>
              <li><span className="text-white">sudo</span>     - Run as administrator</li>
            </ul>
          </div>
        );
        break;
      case "aicall":
        setIsAiMode(true);
        resultMsg = (
          <div className="text-[var(--accent-500)] flex flex-col gap-2 border border-[var(--accent-500)]/20 bg-[var(--accent-500)]/5 p-3 rounded-md mt-1">
            <p className="font-bold">✓ Initializing AI Assistant Protocol...</p>
            <p className="text-[var(--text-primary)]">Hello! I am Amaan's portfolio AI. Ask me anything about his skills, background, or projects.</p>
            <p className="text-[var(--text-secondary)] text-sm pt-1 border-t border-[var(--accent-500)]/20">(Type <span className="text-white font-bold">exitai</span> at any time to leave this mode)</p>
          </div>
        );
        break;
      case "about":
        resultMsg = "I'm Amaan — a B.Tech Computer Science student and aspiring web developer currently in my second year at NIST University, Berhampur. I build real software tools and client projects between lectures.";
        break;
      case "skills":
        resultMsg = (
          <div className="flex flex-col gap-1">
            <p><span className="text-[var(--accent-500)]">Languages:</span> Python, JavaScript, TypeScript, HTML5, CSS3, C, SQL</p>
            <p><span className="text-white">Frontend:</span> React, Next.js, Vite, Tailwind CSS, Framer Motion, GSAP</p>
            <p><span className="text-[var(--text-secondary)]">Backend/Tools:</span> SQLite, Tkinter, Vercel, Node.js</p>
          </div>
        );
        break;
      case "projects":
        resultMsg = (
          <div className="flex flex-col gap-1">
            <p>1. <a href="#projects" className="text-[var(--accent-500)] hover:underline border-b border-transparent">Smart Construction (cons)</a> - Client project with WhatsApp & SEO</p>
            <p>2. <a href="#projects" className="text-[var(--accent-500)] hover:underline border-b border-transparent">GeoStrategos</a> - Browser-based client-side strategy game</p>
            <p className="text-[var(--text-secondary)] mt-1">Scroll down to the Projects section to see more!</p>
          </div>
        );
        break;
      case "contact":
        resultMsg = (
          <div className="flex flex-col gap-1">
            <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--accent-500)] hover:underline">{CONTACT_EMAIL}</a></p>
            <p>Phone: <a href={`tel:${CONTACT_PHONE?.replace(/\s+/g, "")}`} className="text-[var(--accent-500)] hover:underline">{CONTACT_PHONE}</a></p>
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
        resultMsg = trimmedCmd.substring(5).trim();
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

    setHistory((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type,
        content: resultMsg,
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isAiLoading) {
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
          <span className="opacity-50">{isAiMode ? "amaan-ai@chat:~" : "guest@amaan.dev:~"}</span>
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

          {/* AI Loading State */}
          {isAiLoading && (
            <div className="flex items-center gap-2 mt-2">
               <span className="text-[var(--text-secondary)] shrink-0">amaan-ai@chat:~$</span>
               <span className="text-[var(--text-secondary)] italic animate-pulse">Typing...</span>
            </div>
          )}

          {/* Active Input Line */}
          <div className={`flex items-center gap-2 mt-2 ${isAiLoading ? "hidden" : ""}`}>
            <span className="text-[var(--text-secondary)] shrink-0">
              {isAiMode ? "amaan-ai@chat:~$" : "guest@amaan.dev:~$"}
            </span>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isAiLoading}
                className="w-full bg-transparent text-[var(--text-primary)] outline-none border-none opacity-0 absolute inset-0 z-10"
                autoComplete="off"
                spellCheck="false"
                autoCapitalize="off"
              />
              <span className="text-[var(--text-primary)] whitespace-pre">{input}</span>
              <span 
                className={`inline-block w-2.5 h-5 bg-[var(--accent-500)] ml-0.5 ${prefersReducedMotion || isAiLoading ? "opacity-50" : "animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite]"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
